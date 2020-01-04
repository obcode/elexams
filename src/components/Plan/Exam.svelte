<script>
  import Room from "./Room.svelte";
  export let exam;
</script>

<style>
  .person {
    color: green;
  }
</style>

<span class="person">{exam.lecturer.personShortName}</span>
: {exam.anCode}. {exam.name} ({exam.registeredStudentsCount} Anmeldungen)
<ul>
  {#each exam.rooms as room}
    <li>
      <Room {room} />
    </li>
  {/each}

</ul>
