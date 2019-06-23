<script>
  export let dayIndex;
  export let slotIndex;
  export let slotTime;
  import RoomSlot from "./RoomSlot.svelte";
  import Reserve from "./Reserve.svelte";
</script>

<style>
  .bordered {
    border: 1px solid black;
  }
</style>

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
