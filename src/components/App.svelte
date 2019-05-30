<script>
  import { semesterConfig } from "../stores/main.js";
  import {  lecturers } from "../stores/lecturers.js";
  import Plan from "./Plan.svelte";
  import NTA from "./NTA.svelte";
  let info = 1;
  let l = $lecturers; // FIXME: Problem ist Promise in readable
</script>

<style>
  td {
    vertical-align: 0pt;
  }
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
    {#if info === 4}
      <NTA />
    {/if}
  {/if}
</main>
