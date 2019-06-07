<script>
  export let dayIndex;
  export let slotIndex;

  import Exam from "./Exam.svelte";
  import RoomWithExams from "./RoomWithExams.svelte";

  import { fetchValidation } from "../stores/main.js";

  let slotByRooms = [];
  async function fetchSlotByRooms() {
    const resp = await fetch("http://localhost:8080/slotByRooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([dayIndex, slotIndex])
    });
    slotByRooms = await resp.json();
  }
  fetchSlotByRooms();
</script>

<style>
  .slot {
    height: 100%;
    padding: 0px;
  }
</style>

<div class="slot">
  {#if slotByRooms.length > 0}
    {#each slotByRooms as roomWithExams}
      <RoomWithExams {roomWithExams} />
    {/each}
  {/if}
</div>
