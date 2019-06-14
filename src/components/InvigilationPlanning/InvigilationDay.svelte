<script>
  export let dayIndex;
  import {
    invigilations,
    fetchInvigilations,
    fetchSlotsForDay,
    slotsForDay,
    refetch
  } from "../../stores/invigilation.js";
  fetchInvigilations();
  import { semesterConfig, validation } from "../../stores/main.js";
  import { dateString } from "../../misc.js";
  import Invigilator from "./Invigilator.svelte";
  import InvigilationSlot from "./InvigilationSlot.svelte";

  let slotsForThisDay = [];
  fetchSlotsForDay(dayIndex);
  refetch.subscribe(_ => fetchSlotsForDay(dayIndex));
  slotsForDay.subscribe(s => (slotsForThisDay = s));
  function slotForSlot(slotIndex) {
    return slotsForDay[slotIndex];
  }
  let invigs;
</script>

<style>
  table,
  tr,
  td,
  th {
    vertical-align: top;
  }
</style>

{#if $invigilations !== null && $invigilations !== undefined}
  <table>
    <tr>
      <td>
        <table>
          <tr>
            <th>Aufsichten</th>
            <th>TODO</th>
          </tr>
          {#each $invigilations[1] as invigilator}
            <Invigilator invigilatorID={invigilator.invigilatorID} {dayIndex} />
          {/each}
        </table>
      </td>
      <td>
        <table>
          <tr>
            <th> {dateString($semesterConfig.examDays[dayIndex])} </th>
          </tr>
          {#if slotsForThisDay.length > 0}
            {#each $semesterConfig.slotsPerDay as slotTime, slotIndex}
              <InvigilationSlot {slotIndex} {slotTime} />
            {/each}
          {/if}
        </table>
      </td>
    </tr>
  </table>
{/if}
