<script>
  import Slot from "./Slot.svelte";
  import ExamDetails from "./ExamDetails.svelte";
  import Unscheduled from "./Unscheduled.svelte";
  import { refetchExams, fetchValidation } from "../store.js";

  let semesterConfig;
  const fetchSemesterConfig = async () => {
    const response = await fetch("http://localhost:8080/semesterConfig");
    semesterConfig = await response.json();
  };
  fetchSemesterConfig();

  let info = 1;

  function isGOSlot(dayIndex, slotIndex) {
    for (const goSlot of semesterConfig.goSlots) {
      if (goSlot[0] === dayIndex && goSlot[1] === slotIndex) return true;
    }
    return false;
  }

  function dateString(date) {
    const d = new Date(date);
    const options = {
      weekday: "short",
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    };
    return d.toLocaleString("de-DE", options);
  }

  function weekend(date) {
    const d = new Date(date);
    return d.getDay() === 5;
  }

  async function reloadPlan() {
    const reloadResult = await fetch("http://localhost:8080/reloadPlan");
    const jsonResult = await reloadResult.json();
    if (jsonResult) {
      refetchExams.set([]);
      fetchValidation();
      alert(JSON.stringify(jsonResult));
    } else {
      alert(`Cannot reload Plan\n ${JSON.stringify(jsonResult)}`);
    }
  }
</script>

<style>
  td,
  table,
  th {
    border-collapse: collapse;
    user-select: none;
    border: 1px solid black;
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

{#if semesterConfig === undefined}
  Loading...
{:else}
  <button on:click={reloadPlan}>Reload Plan from Server</button>
  <label>
    <input type="radio" bind:group={info} value={1} />
    Details
  </label>
  <label>
    <input type="radio" bind:group={info} value={2} />
    Konflikte
  </label>
  <label>
    <input type="radio" bind:group={info} value={3} />
    Alle Prüfungen eines Prüfers
  </label>
  <h1>Prüfungsplan {semesterConfig.semester}</h1>
  <ExamDetails />
  <table>
    <tr>
      <th />
      {#each semesterConfig.examDays as examDay, index}
        <th class="days">
           {dateString(examDay)}
          <br />
          ({index})
        </th>
        {#if weekend(examDay)}
          <th class="weekend" />
        {/if}
      {/each}
    </tr>
    {#each semesterConfig.slotsPerDay as slot, slotIndex}
      <tr>
        <td class="times">
           {slot}
          <br />
          ({slotIndex})
        </td>
        {#each semesterConfig.examDays as examDay, dayIndex}
          <td class="exams">
            <div id="slot_{dayIndex}_{slotIndex}" class="slot">
              <Slot
                {dayIndex}
                {slotIndex}
                goSlot={isGOSlot(dayIndex, slotIndex)} />
            </div>
          </td>
          {#if weekend(examDay)}
            <td class="weekend" />
          {/if}
        {/each}
      </tr>
    {/each}
  </table>
  <Unscheduled />
{/if}
