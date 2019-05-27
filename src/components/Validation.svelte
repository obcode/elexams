<script>
  import { validation, fetchValidation } from "../store.js";
  let yes = false;
  let vali = [];
  fetchValidation();
  validation.subscribe(v => {
    vali = v;
  });
</script>

<style>
  .Info {
    background-color: aqua;
  }
  .SoftConstraintBroken {
    background-color: rgb(212, 153, 110);
  }
  .HardConstraintBroken {
    background-color: crimson;
  }
</style>

<label>
  <input type="checkbox" bind:checked={yes} />
  Show Validation
</label>

{#if yes}
  <h1>Validation</h1>

  {#if vali.length === 0}
    <p>Validation loading...</p>
  {:else}
    <h2>{vali.result}</h2>
    <ul>
      {#each vali.brokenConstraints as val}
        <li class={val.tag}> {val.contents} </li>
      {/each}
    </ul>
  {/if}

{/if}
