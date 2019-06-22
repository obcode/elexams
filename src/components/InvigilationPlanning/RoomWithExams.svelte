<script>
  export let dayIndex
  export let roomWithExams;
  let slotIndex = roomWithExams[0][1].slot[1]
  import { selectedRoom, showExams } from "../../stores/rooms.js";
  import { refetch, fetchInvigilations } from "../../stores/invigilation.js";
  import { fetchValidation } from "../../stores/main.js";
  import RoomWithExam from "./RoomWithExam.svelte";
  const room = roomWithExams[0][0];
  const roomID = room.roomID;

  let hasInvigilator = room.invigilator !== null;

  import Modal from "../Modal.svelte";
  let showModal = false;

  import { plannedRooms } from "../../stores/rooms.js";

  let plannedRoom;
  function setPlannedRoom() {
    plannedRoom = $plannedRooms.find(r => r.plannedRoomID === roomID);
    return true;
  }
  const studentsInRoom = roomWithExams.reduce(
    (acc, roomWithExam) => acc + roomWithExam[0].studentsInRoom.length,
    0
  );
  const problem = studentsInRoom > room.maxSeats;
  const full = studentsInRoom === room.maxSeats;

  function roomOnlyForSlots() {
    let r = `roomOnlyForSlots:\n  - roomNumber: ${roomID}\n    slots:\n`;
    for (const dayAndSlots of plannedRoom.plannedRoomDaysAndSlots) {
      r += `    # ${dayAndSlots.plannedRoomDay}\n`;
      for (const slot of dayAndSlots.plannedRoomSlots) {
        r += `    # ${slot[1]}\n    - [${dayAndSlots.plannedRoomDayNumber}, ${
          slot[0]
        }]\n`;
      }
    }
    return r;
  }
  let showMe = true;
  selectedRoom.subscribe(selRoom => {
    showMe = selRoom === "alle" || selRoom === roomID;
  });
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
      addInvigilatorRoom: roomID
    };
    fetch("http://localhost:8080/addInvigilator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(invigilation)
    }).then(() => {
      refetch.update(i => i + 1);
      fetchInvigilations();
      fetchValidation("ValidateInvigilation");
    });
  }
</script>

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

{#if showMe}
  {#if roomWithExams !== undefined && roomWithExams !== null && roomWithExams.length > 0}
    <div class="room {room.roomID}"     
    class:draggedOver
    class:hasInvigilator
    on:dragover={dragOver}
    on:dragenter={dragEnter}
    on:dragleave={dragLeave}
    on:drop={dragDrop} >
      <span class="roomID" on:click={() => (showModal = true)}> {roomID} </span>
      <span class="studentCount" class:problem class:full>
         {studentsInRoom} / {room.maxSeats}
      </span>
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

    {#if showModal && setPlannedRoom()}
      <Modal on:close={() => (showModal = false)}>
        <h2 slot="header"> {roomID} </h2>

        <ul>
          {#each plannedRoom.plannedRoomDaysAndSlots as dayAndSlots}
            <li>
               {dayAndSlots.plannedRoomDay}
              <ul>
                {#each dayAndSlots.plannedRoomSlots as slot}
                  <li>{slot[1]}</li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>

        <hr />
        <h2>für das yaml</h2>
        <hr />
        <pre> {roomOnlyForSlots()} </pre>

      </Modal>
    {/if}
  {/if}
{/if}
