<script>
  export let dayIndex;
  export let slotIndex;

  import RoomWithExams from "./RoomWithExams.svelte";

  let slotByRooms = [];
  async function fetchSlotByRooms() {
    const resp = await fetch("http://127.0.0.1:8080/slotByRooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([dayIndex, slotIndex]),
    });
    slotByRooms = await resp.json();
  }
  fetchSlotByRooms();
</script>

<div class="slot">
  {#if slotByRooms.length > 0}
    {#each slotByRooms as roomWithExams}
      <RoomWithExams {roomWithExams} />
    {/each}
  {/if}
</div>

<style>
  .slot {
    height: 100%;
    padding: 0px;
  }
</style>
