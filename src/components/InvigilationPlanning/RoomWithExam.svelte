<script>
  export let roomWithExam;
  import Modal from "../Modal.svelte";
  let showModal = false;
  const room = roomWithExam[0];
  const reserveRoom = room.reserveRoom;
  const handicapCompensation = room.handicapCompensation;
  const exam = roomWithExam[1];
</script>

<style>
  .roomWithExam {
    align-content: center;
    font-size: 12px;
    display: inline-block;
    border: 2px black dotted;
    width: 97%;
    margin: 2px;
    background-color: aquamarine;
  }
  .room {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.2s linear;
    padding: 0.2rem 0.2rem;
  }
  .room:focus,
  .room:hover {
    color: transparent;
  }
  .room:focus:after,
  .room:hover:after {
    content: attr(data-text);
    overflow: visible;
    text-overflow: inherit;
    background: #fff;
    position: absolute;
    left: auto;
    top: auto;
    width: auto;
    max-width: 20rem;
    border: 1px solid #eaebec;
    padding: 0 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.28);
    white-space: normal;
    word-wrap: break-word;
    display: block;
    color: black;
    margin-top: -1.25rem;
  }
  .reserveRoom {
    background-color: grey;
  }
  .handicapCompensation {
    background-color: yellow;
  }
</style>

<div
  class="roomWithExam"
  class:reserveRoom
  class:handicapCompensation
  on:click={() => (showModal = true)}>
  <span>
      {exam.slot}:
     {room.studentsInRoom.length} Stud - {exam.duration + room.deltaDuration}
    Minuten
  </span>
  <span
    class="room"
    data-text="{exam.lecturer.personShortName}, {exam.anCode}. {exam.name}">
     {exam.lecturer.personShortName}, {exam.name}
  </span>
</div>

{#if showModal}
  <Modal on:close={() => (showModal = false)}>
    <h2 slot="header">
       {exam.anCode}. {exam.name}, {exam.lecturer.personShortName}
    </h2>

    <ol>
      {#each room.studentsInRoom as student}
        <li>
           {student.studentFamilyname}, {student.studentFirstname} ({student.studentGroup})
          {#if student.studentHandicap !== null && student.studentHandicap !== undefined}
            : {student.studentHandicap.handicapCompensationText}
          {/if}
        </li>
      {/each}
    </ol>
  </Modal>
{/if}
