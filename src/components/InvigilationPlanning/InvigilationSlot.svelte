<script>
  export let slotIndex;
  export let slotTime;
    import RoomSlot from "./RoomSlot.svelte";
    import Reserve from "./Reserve.svelte";
  import { slotsForDay, refetch } from "../../stores/invigilation.js";
  let mySlot = [];
  let dayIndex;

  slotsForDay.subscribe(slotsForThisDay => {
    if (
      slotsForThisDay !== null &&
      slotsForThisDay !== undefined &&
      slotsForThisDay.length > 0
    ) {
      mySlot = slotsForThisDay[slotIndex];
      dayIndex = mySlot[0][0];
    } else {
      mySlot = [];
      dayIndex = -1;
    }
  });

  refetch.update(i => i + 1);
  
</script>

<style>
  .bordered {
    border: 1px solid black;
  }
</style>

{#if mySlot.length > 0 || dayIndex >= 0}
  <tr>
    <td class="bordered">
      ({dayIndex}, {slotIndex}) {slotTime}
      <br />
      <Reserve {dayIndex} {slotIndex} />
    </td>
    <td class="bordered">
      <RoomSlot {dayIndex} {slotIndex} />
    </td>
  </tr>
{/if}
