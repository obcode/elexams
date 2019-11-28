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
  import { semesterConfig } from "../../stores/main.js";
  import { dateString } from "../../misc.js";
</script>

<style>
  .handicap {
    color: red;
  }
  .conflict {
    padding: 4px;
  }
</style>

{#if $semesterConfig === undefined || $semesterConfig === null}
  Loading...
{:else}
  {#if exam !== null && exam !== undefined}
    <h3>{exam.lecturer.personFullName}</h3>
    <h1>
      {exam.name}
      {#if exam.slot === null}
        (noch nicht eingeplant)
      {:else}
        : {dateString($semesterConfig.examDays[exam.slot[0]])} ({exam.slot[0]}),
        {$semesterConfig.slotsPerDay[exam.slot[1]]} ({exam.slot[1]})
      {/if}
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
          {#each stud.studentAncodes as ac}
            <span class="conflict">
              <a href="/exam/{ac}">{ac}</a>
            </span>
          {/each}
        </li>
      {/each}
    </ol>
  {:else}
    <h1>Anmeldecode unbekannt!</h1>
  {/if}
{/if}
