<script>
  import { semesterConfig, validation } from "../stores/main.js";

  import Plan from "./ExamPlanning/Plan.svelte";
  import Rooms from "./RoomPlanning/Rooms.svelte";
  import Invigilation from "./InvigilationPlanning/Invigilation.svelte";
  import NTA from "./NTA.svelte";
  let info = "plan";
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
        <input type="radio" bind:group={info} value="plan" />
        Prüfungsplanung
      </label>
      <label>
        <input type="radio" bind:group={info} value="rooms" />
        Raumplanung
      </label>
      <label>
        <input type="radio" bind:group={info} value="invigs" />
        Aufsichtenplanung
      </label>
      <label>
        <input type="radio" bind:group={info} value="nta" />
        NTA
      </label>
    </div>
    {#if info === 'plan'}
      <Plan />
    {:else if info === 'rooms'}
      <Rooms />
    {:else if info === 'invigs'}
      <Invigilation />
    {:else if info === 'nta'}
      <NTA />
    {/if}
  {/if}
</main>
