<script>
  export let room;

  import Student from "./Student.svelte";

  const reserveRoom = room.reserveRoom;
  const handicapCompensation = room.handicapCompensation;
</script>

<style>
  .person {
    color: green;
  }
  .reserveRoom {
    color: grey;
  }
  .handicapCompensation {
    color: red;
  }
</style>

<span class:reserveRoom class:handicapCompensation>{room.roomID}</span>
({room.studentsInRoom.length}/{room.maxSeats}) - Aufsicht:
<span class="person">{room.invigilator.invigilatorName}</span>
{#if handicapCompensation}
  <ul>
    {#each room.studentsInRoom as stud}
      <li>
        <Student {stud} />
      </li>
    {/each}
  </ul>
{/if}
