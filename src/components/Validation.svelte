<script>
  let validation = [];
  const fetchValidation = async () => {
    let response = await fetch("http://localhost:8080/validation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(["ValidateSchedule"])
    });
    validation = await response.json();
  };
  fetchValidation();
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

<h1>Validation</h1>

{#if validation.length === 0}
  <p>Validation loading...</p>
{:else}
  <h2>{validation.result}</h2>
  <ul>
    {#each validation.brokenConstraints as val}
      <li class={val.tag}> {val.contents} </li>
    {/each}
  </ul>
{/if}
