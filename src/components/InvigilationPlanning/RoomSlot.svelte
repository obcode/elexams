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

let slotByRooms = []
  slotsByRooms.subscribe(s => slotByRooms = s[slotIndex])
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
      <RoomWithExams {dayIndex} {roomWithExams} />
    {/each}
  {/if}
</div>
