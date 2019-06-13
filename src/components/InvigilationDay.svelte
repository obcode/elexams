<script>
  export let dayIndex;
  import { invigilations, fetchInvigilations } from "../stores/invigilation.js";
  fetchInvigilations();
  import { semesterConfig, validation } from "../stores/main.js";
  import { dateString } from "../misc.js";
  import Invigilator from "./Invigilator.svelte";
  import RoomSlotInvigilation from "./RoomSlotInvigilation.svelte";
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
          </tr>
          {#each $invigilations[1] as invigilator}
            <tr>
              <Invigilator
                invigilatorID={invigilator.invigilatorID}
                {dayIndex} />
            </tr>
          {/each}
        </table>
      </td>
      <td>
        <table>
          <tr>
            <th> {dateString($semesterConfig.examDays[dayIndex])} </th>
          </tr>
          {#each $semesterConfig.slotsPerDay as slot, slotIndex}
            <tr>
              <td>({slotIndex}) {slot}</td>
              <td>
                <RoomSlotInvigilation {dayIndex} {slotIndex} />
              </td>
            </tr>
          {/each}
        </table>
      </td>
    </tr>
  </table>
{/if}
