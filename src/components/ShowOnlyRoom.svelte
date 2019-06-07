<script>
  import { plannedRooms, selectedRoom } from "../stores/rooms.js";
  let selected = "";
  function setSelected() {
    selectedRoom.set(selected);
  }
</script>

<style>
  select {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-color: aqua;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
  }
  select:hover {
    border-color: #888;
  }
  select:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
</style>

{#if $plannedRooms.length > 0}
  Zeige nur Raum
  <select bind:value={selected} on:change={setSelected} name="room" id="room">
    <option value="alle">alle</option>
    {#each $plannedRooms as plannedRoom}
      <option value={plannedRoom.plannedRoomID}>
         {plannedRoom.plannedRoomID}
      </option>
    {/each}
  </select>
{/if}
