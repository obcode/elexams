<script>
  export let validateWhat;
  import { validation, fetchValidation } from "../stores/main.js";
  let yes = true;
  let result;
  let info;
  let softConstraints;
  let hardConstraints;
  fetchValidation(validateWhat);
  validation.subscribe(v => {
    if (v === null || v === undefined || v.length === 0) {
      result = null;
      info = [];
      softConstraints = [];
      hardConstraints = [];
    } else {
      result = v.result;
      function filterFunc(t) {
        return entry => entry.validationRecordType === t;
      }
      info = v.brokenConstraints.filter(filterFunc("Info"));
      softConstraints = v.brokenConstraints.filter(
        filterFunc("SoftConstraintBroken")
      );
      hardConstraints = v.brokenConstraints.filter(
        filterFunc("HardConstraintBroken")
      );
    }
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

  {#if result === undefined || result === null}
    <p>Validation loading...</p>
  {:else}
    <h2>{result}</h2>
    <ul>
      {#each hardConstraints as val}
        <li class={val.validationRecordType}> {val.validationRecordText} </li>
      {/each}
    </ul>
    <ul>
      {#each softConstraints as val}
        <li class={val.validationRecordType}> {val.validationRecordText} </li>
      {/each}
    </ul>
  {/if}

{/if}
