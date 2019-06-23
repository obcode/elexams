<script>
  export let dayIndex;
  export let slotIndex;

  import RoomWithExams from "./RoomWithExams.svelte";
  import { fetchValidation } from "../../stores/main.js";
  import {
    refetch,
    slotsForDay,
    slotsByRooms
  } from "../../stores/invigilation.js";

  let slotByRooms = [];

  $: setDetails($slotsByRooms, dayIndex, slotIndex);

  slotsByRooms.subscribe(s => setDetails(s));

  function setDetails(s, d, sl) {
    slotByRooms = s[sl];
  }
</script>

<style>
  .slot {
    height: 100%;
    padding: 0px;
  }
</style>

<div class="slot">
  {#if slotByRooms !== null && slotByRooms !== undefined && slotByRooms.length > 0}
    {#each slotByRooms as roomWithExams}
      <RoomWithExams {dayIndex} {slotIndex} {roomWithExams} />
    {/each}
  {/if}
</div>
