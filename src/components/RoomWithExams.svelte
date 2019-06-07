<script>
  export let roomWithExams;
  import { selectedRoom } from "../stores/rooms.js";
  import RoomWithExam from "./RoomWithExam.svelte";
  const roomID = roomWithExams[0][0].roomID;

  import Modal from "./Modal.svelte";
  let showModal = false;

  import { plannedRooms } from "../stores/rooms.js";

  let plannedRoom;
  function setPlannedRoom() {
    plannedRoom = $plannedRooms.find(r => r.plannedRoomID === roomID);
    return true;
  }
  const studentsInRoom = roomWithExams.reduce(
    (acc, roomWithExam) => acc + roomWithExam[0].studentsInRoom.length,
    0
  );
  const problem = studentsInRoom > roomWithExams[0][0].maxSeats;
  const full = studentsInRoom === roomWithExams[0][0].maxSeats;

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
    showMe = selRoom === "alle" || selRoom === roomID
  }
  )
</script>

<style>
  .room {
    font-size: 14px;
    display: inline-block;
    border: 2px rgb(226, 69, 12) solid;
    border-radius: 5px;
    width: 190px;
    background-color: lightgreen;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 8px;
    align-content: center;
  }
  .studentCount {
    float: right;
    padding: 1px;
    border-left: 2px rgb(226, 69, 12) solid;
    border-bottom: 2px rgb(226, 69, 12) solid;
    border-radius: 1px;
  }
  .R1\.046 {
    background-color: red;
  }
  .R1\.049 {
    background-color: rgb(106, 119, 230);
  }
  .problem {
    font-size: 100px;
  }
  .full {
    background-color: pink;
  }
</style>

{#if showMe}
  {#if roomWithExams !== undefined && roomWithExams !== null && roomWithExams.length > 0}
    <div class="room {roomWithExams[0][0].roomID}">
      <span class="roomID" on:click={() => (showModal = true)}> {roomID} </span>
      <span class="studentCount" class:problem class:full>
         {studentsInRoom} / {roomWithExams[0][0].maxSeats}
      </span>
      {#each roomWithExams as roomWithExam}
        <RoomWithExam {roomWithExam} />
      {/each}
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
