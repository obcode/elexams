<script>
  import Plan from "./Plan.svelte";
  let info = 1;
</script>

<style>
  td {
    vertical-align: 0pt;
  }
</style>

<main>
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
  {#if info === 1}
    <Plan />
  {/if}
</main>
