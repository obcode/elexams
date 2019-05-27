<script>
  import { clickedExamAnCode } from "../store.js";
  let yes = false;
  let ancode = 0;
  clickedExamAnCode.subscribe(ac => {
    ancode = ac;
  });
</script>

<style>

</style>

<label>
  <input type="checkbox" bind:checked={yes} />
  Zeige Details zur ausgewählten Prüfung {ancode}
</label>

{#if yes}
  <h1>Details</h1>
{/if}
