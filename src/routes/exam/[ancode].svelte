<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch("http://localhost:8080/exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: params.ancode
    });
    const data = await res.json();

    if (res.status === 200) {
      return { exam: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let exam;
</script>

<style>
  .handicap {
    color: red;
  }
</style>

{#if exam !== null && exam !== undefined}
  <h3>{exam.lecturer.personFullName}</h3>
  <h1>
    {exam.name}
    {#if exam.slot === null}(noch nicht eingeplant){:else}: {exam.slot}{/if}
  </h1>
  <ol>
    {#each exam.registeredStudents as stud}
      <li>
        ({stud.studentGroup}) {stud.studentFamilyname}, {stud.studentFirstname}
        {#if stud.studentHandicap !== null}
          <span class="handicap">
            ({stud.studentHandicap.handicapCompensationText})
          </span>
        {/if}
      </li>
    {/each}
  </ol>
{:else}
  <h1>Anmeldecode unbekannt!</h1>
{/if}
