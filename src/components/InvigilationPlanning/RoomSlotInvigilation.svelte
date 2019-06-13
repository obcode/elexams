<script>
  export let dayIndex;
  export let slotIndex;

  import RoomWithExams from "../RoomPlanning/RoomWithExams.svelte";
  import { fetchValidation } from "../../stores/main.js";
  import { refetch } from "../../stores/invigilation.js";

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
  refetch.subscribe( _ => fetchSlotByRooms())
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
