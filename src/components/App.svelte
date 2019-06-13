<script>
  import { semesterConfig, validation } from "../stores/main.js";
  import { lecturers } from "../stores/lecturers.js";
  import { plannedRooms } from "../stores/rooms.js";
  import { allAncodes } from "../stores/exams.js";

  import Plan from "./ExamPlanning/Plan.svelte";
  import Rooms from "./RoomPlanning/Rooms.svelte";
  import Invigilation from "./InvigilationPlanning/Invigilation.svelte";
  import NTA from "./NTA.svelte";
  let info = 3;
  let l = $lecturers; // FIXME: Problem ist Promise in readable
  let p = $plannedRooms; // FIXME: Problem ist Promise in readable
  let a = $allAncodes; // FIXME: Problem ist Promise in readable
</script>

<style>

</style>

<main>

  {#if $semesterConfig === undefined || $semesterConfig === null}
    Loading...
  {:else}
    <h1>Prüfungsplan {$semesterConfig.semester}</h1>
    <div>
      <label>
        <input type="radio" bind:group={info} value={1} />
        Prüfungsplanung
      </label>
      <label>
        <input type="radio" bind:group={info} value={2} />
        Raumplanung
      </label>
      <label>
        <input type="radio" bind:group={info} value={3} />
        Aufsichtenplanung
      </label>
      <label>
        <input type="radio" bind:group={info} value={4} />
        NTA
      </label>
    </div>
    {#if info === 1}
      <Plan />
    {/if}
    {#if info === 2}
      <Rooms />
    {/if}
    {#if info === 3}
      <Invigilation />
    {/if}
    {#if info === 4}
      <NTA />
    {/if}
  {/if}
</main>
