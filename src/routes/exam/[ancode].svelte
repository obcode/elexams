<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch("http://127.0.0.1:8080/exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: params.ancode,
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

{#if $semesterConfig === undefined || $semesterConfig === null}
  Loading...
{:else if exam !== null && exam !== undefined}
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
  {#if exam.registeredStudents.length !== 0}
    <h2>Studierende ohne Raum</h2>
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
            {#if ac !== exam.anCode}
              <span class="conflict">
                <a href="/exam/{ac}">{ac}</a>
              </span>
            {/if}
          {/each}
        </li>
      {/each}
    </ol>
  {/if}
  {#if exam.rooms.length !== 0}
    <h2>Geplante Räume</h2>
    {#each exam.rooms as room}
      <h3>
        {room.roomID} ({room.studentsInRoom.length}/{room.maxSeats})
        {#if room.handicapCompensation}(NTA){/if}
        {#if room.reserveRoom}(Reserve){/if}
      </h3>
      <ol>
        {#each room.studentsInRoom as stud}
          <li>
            ({stud.studentGroup}) {stud.studentFamilyname}, {stud.studentFirstname}
            {#if stud.studentHandicap !== null}
              <span class="handicap">
                ({stud.studentHandicap.handicapCompensationText})
              </span>
            {/if}
            {#each stud.studentAncodes as ac}
              {#if ac !== exam.anCode}
                <span class="conflict">
                  <a href="/exam/{ac}">{ac}</a>
                </span>
              {/if}
            {/each}
          </li>
        {/each}
      </ol>
    {/each}
  {/if}
{:else}
  <h1>Anmeldecode unbekannt!</h1>
{/if}

<style>
  .handicap {
    color: red;
  }
  .conflict {
    padding: 4px;
  }
</style>
