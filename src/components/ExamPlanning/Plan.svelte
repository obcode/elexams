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
    clickedExamAnCode,
    refetchUnscheduled,
  } from "../../stores/exams.js";
  import { dateString, weekend, isWeekend } from "../../misc.js";

  function toggleShowRegisteredGroups() {
    showRegisteredGroups.update((b) => !b);
  }

  function toggleShowRooms() {
    showRooms.update((b) => !b);
  }

  let ancode = 0;
  let loading = false;

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
    loading = true;
    const reloadResult = await fetch("http://127.0.0.1:8080/reloadPlan");
    const jsonResult = await reloadResult.json();
    loading = false;
    if (jsonResult) {
      // refetchExams.set([]);
      // refetchUnscheduled.update(i => i + 1);
      // fetchValidation("ValidateSchedule");
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

{#if $semesterConfig === undefined || $semesterConfig === null || loading}
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
        <option value={ancode}>{ancode}</option>
      {/each}
    </select>
  {/if}

  <ShowExamsByLecturer />
  <label>
    <input type="checkbox" on:click={toggleShowRegisteredGroups} checked />
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
              {#if weekend(examDay, $semesterConfig.examsOnSaturdays)}
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
                <td
                  class="planTable exams {isWeekend(
                    examDay,
                    $semesterConfig.examsOnSaturdays
                  )}"
                >
                  <div id="slot_{dayIndex}_{slotIndex}" class="slot">
                    <Slot
                      {dayIndex}
                      {slotIndex}
                      goSlot={isGOSlot(dayIndex, slotIndex)}
                    />
                  </div>
                </td>
                {#if weekend(examDay, $semesterConfig.examsOnSaturdays)}
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
  .isWeekend {
    background-color: rgb(241, 100, 100);
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
