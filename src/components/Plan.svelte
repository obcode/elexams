<script>
  import Slot from "./Slot.svelte";

  let semesterConfig;
  const fetchSemesterConfig = async () => {
    const response = await fetch("http://localhost:8080/semesterConfig");
    semesterConfig = await response.json();
  };
  fetchSemesterConfig();

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
</script>

<style>
  td,
  table,
  th {
    border-collapse: collapse;
    user-select: none;
    border: 1px solid black;
    vertical-align: top;
  }
  .exams {
    height: 60px;
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
    padding: 5px;
    padding-top: 15px;
    height: 100%;
    max-width: 200px;
  }
</style>

{#if semesterConfig === undefined}
  Loading...
{:else}
  <h1>Prüfungsplan {semesterConfig.semester}</h1>
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
            <div
              id="slot_{dayIndex}_{slotIndex}"
              class="slot"
              data-day={dayIndex}
              data-slot={slotIndex}>
              <Slot {dayIndex} {slotIndex} />
            </div>
          </td>
          {#if weekend(examDay)}
            <td class="weekend" />
          {/if}
        {/each}
      </tr>
    {/each}
  </table>
{/if}
