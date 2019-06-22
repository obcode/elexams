<script>
  import Slot from "./Slot.svelte";
  import ExamDetails from "./ExamDetails.svelte";
  import ShowExamsByLecturer from "./ShowExamsByLecturer.svelte";
  import Unscheduled from "./Unscheduled.svelte";
  import Validation from "../Validation.svelte";
  import { fetchValidation, semesterConfig } from "../../stores/main.js";
  import {
    allAncodes,
    refetchExams,
    showRegisteredGroups,
    showRooms,
    selectedExamAnCode,
    clickedExamAnCode
  } from "../../stores/exams.js";
  import { dateString, weekend } from "../../misc.js";

  function toggleShowRegisteredGroups() {
    showRegisteredGroups.update(b => !b);
  }

  function toggleShowRooms() {
    showRooms.update(b => !b);
  }

  let ancode = 0;

  function setAncode() {
    clickedExamAnCode.set(ancode);
  }

  function isGOSlot(dayIndex, slotIndex) {
    for (const goSlot of $semesterConfig.goSlots) {
      if (goSlot[0] === dayIndex && goSlot[1] === slotIndex) return true;
    }
    return false;
  }

  async function reloadPlan() {
    const reloadResult = await fetch("http://localhost:8080/reloadPlan");
    const jsonResult = await reloadResult.json();
    if (jsonResult) {
      refetchExams.set([]);
      fetchValidation("ValidateSchedule");
      if (jsonResult[0]) {
        let output = "Erfolgreich!!\n";
        for (const info of jsonResult[1]) {
          output += `\n${info}`;
        }
        alert(output);
      } else {
        alert(JSON.stringify(jsonResult));
      }
    } else {
      alert(`Cannot reload Plan\n ${JSON.stringify(jsonResult)}`);
    }
  }
</script>

<style>
  hr {
    border: 1px solid red;
  }
  .planTable {
    border-collapse: collapse;
    user-select: none;
    border: 1px solid black;
    vertical-align: top;
    font-size: 12px;
  }
  .validation {
    vertical-align: top;
    font-size: 12px;
  }
  .exams {
    height: 30px;
  }
  .times {
    width: 40px;
    background-color: rgb(176, 190, 197);
    text-align: center;
  }
  .days {
    min-width: 200px;
    background-color: rgb(176, 190, 197);
    text-align: center;
  }
  .weekend {
    background-color: rgb(176, 190, 197);
    min-width: 30px;
  }
  .slot {
    /* padding: 5px;
    padding-top: 15px; */
    height: 100%;
    max-width: 200px;
  }
  button {
    border-radius: 12px;
    border: 5px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: rgb(100, 237, 237);
  }
</style>

{#if $semesterConfig === undefined || $semesterConfig === null}
  Loading...
{:else}
  <h1>
    Prüfungsplanung
    {#if $semesterConfig.scheduleFrozen}(keine Änderungen mehr möglich){/if}
  </h1>
  <button on:click={reloadPlan}>Reload Plan from Server</button>
  {#if $allAncodes.length > 0}
    Zeige Prüfung mit AnCode:
    <select bind:value={ancode} on:change={setAncode} name="ancode" id="ancode">
      <option value="0">auswählen</option>
      {#each $allAncodes as ancode}
        <option value={ancode}> {ancode} </option>
      {/each}
    </select>
  {/if}

  <ShowExamsByLecturer />
  <label>
    <input type="checkbox" on:click={toggleShowRegisteredGroups} />
    zeige Anmeldungen
  </label>
  <label>
    <input type="checkbox" on:click={toggleShowRooms} />
    zeige Räume
  </label>
  <table>
    <tr>
      <td>
        <table class="planTable">
          <tr class="planTable">
            <th />
            {#each $semesterConfig.examDays as examDay, index}
              <th class="planTable days">
                 {dateString(examDay)}
                <br />
                ({index})
              </th>
              {#if weekend(examDay)}
                <th class="planTable weekend" />
              {/if}
            {/each}
          </tr>
          {#each $semesterConfig.slotsPerDay as slot, slotIndex}
            <tr>
              <td class="planTable times">
                 {slot}
                <br />
                ({slotIndex})
              </td>
              {#each $semesterConfig.examDays as examDay, dayIndex}
                <td class="planTable exams">
                  <div id="slot_{dayIndex}_{slotIndex}" class="slot">
                    <Slot
                      {dayIndex}
                      {slotIndex}
                      goSlot={isGOSlot(dayIndex, slotIndex)} />
                  </div>
                </td>
                {#if weekend(examDay)}
                  <td class="planTable weekend" />
                {/if}
              {/each}
            </tr>
          {/each}
        </table>
        <Unscheduled />
      </td>
      <td class="validation">
        <ExamDetails />
        <hr />
        <Validation validateWhat="ValidateSchedule" />
      </td>
    </tr>
  </table>
{/if}
