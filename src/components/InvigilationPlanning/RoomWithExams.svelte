<script>
  export let dayIndex;
  export let slotIndex;
  export let roomWithExams;

  import { selectedRoom, showExams } from "../../stores/rooms.js";
  import {
    refetch,
    fetchInvigilations,
    fetchSlotsForDay,
  } from "../../stores/invigilation.js";
  import { fetchValidation } from "../../stores/main.js";
  import RoomWithExam from "./RoomWithExam.svelte";

  let room;
  let roomID;
  let hasInvigilator;
  let studentsInRoom;

  function setDetails(d, s, r) {
    room = r[0][0];
    roomID = room.roomID;
    hasInvigilator = room.invigilator !== null;
    studentsInRoom = r.reduce(
      (acc, roomWithExam) => acc + roomWithExam[0].studentsInRoom.length,
      0
    );
  }

  $: setDetails(dayIndex, slotIndex, roomWithExams);

  let draggedOver = false;
  function dragOver(event) {
    event.preventDefault();
  }

  function dragEnter(event) {
    event.preventDefault();
    draggedOver = true;
  }

  function dragLeave() {
    event.preventDefault();
    draggedOver = false;
  }

  function dragDrop(event) {
    event.preventDefault();
    draggedOver = false;
    const invigilatorID = JSON.parse(
      event.dataTransfer.getData("invigilatorID")
    );
    const invigilation = {
      addInvigilatorID: invigilatorID,
      addInvigilatorSlot: [dayIndex, slotIndex],
      addInvigilatorRoom: roomID,
    };
    fetch("http://127.0.0.1:8080/addInvigilator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invigilation),
    }).then(() => {
      // refetch.update(i => i + 1);
      fetchSlotsForDay(dayIndex);
      fetchInvigilations();
      fetchValidation("ValidateInvigilation");
    });
  }
</script>

{#if roomWithExams !== undefined && roomWithExams !== null && roomWithExams.length > 0}
  <div
    class="room {room.roomID}"
    class:draggedOver
    class:hasInvigilator
    on:dragover={dragOver}
    on:dragenter={dragEnter}
    on:dragleave={dragLeave}
    on:drop={dragDrop}
  >
    <span class="roomID"> {roomID} </span>
    <span class="studentCount"> {studentsInRoom} / {room.maxSeats} </span>
    {#if $showExams}
      {#each roomWithExams as roomWithExam}
        <RoomWithExam {roomWithExam} />
      {/each}
    {/if}
    <div>
      Aufsicht:
      {#if hasInvigilator}{room.invigilator.invigilatorName}{:else}fehlt{/if}
    </div>
  </div>
{/if}

<style>
  .room {
    font-size: 14px;
    display: inline-block;
    border: 2px rgb(226, 69, 12) solid;
    border-radius: 5px;
    width: 190px;
    background-color: red;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 8px;
    align-content: center;
  }
  .studentCount {
    float: right;
    padding: 1px;
  }
  .hasInvigilator {
    background-color: lightgreen;
  }
  .draggedOver {
    background-color: green;
  }
</style>
