<script>
  export let dayIndex;
  export let slotIndex;

  import Exam from "./Exam.svelte";

  let exams = [];
  const fetchExams = async () => {
    const response = await fetch("http://localhost:8080/slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([dayIndex, slotIndex])
    });
    exams = await response.json();
  };
  fetchExams();

  let reserve = null;
  const fetchReserve = async () => {
    const response = await fetch("http://localhost:8080/reserveForSlot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([dayIndex, slotIndex])
    });
    reserve = await response.json();
  };
  fetchReserve();
</script>

<style>
  .grey {
    color: lightgrey;
  }
  .person {
    color: green;
  }
</style>

{#if exams.length > 0}
  ({dayIndex}, {slotIndex}),
  {#if reserve !== null}
    Reserveaufsicht:
    <span class="person">{reserve.invigilatorName}</span>
  {/if}
  <ul>
    {#each exams as exam}
      {#if exam.plannedByMe}
        <li>
          <Exam {exam} />
        </li>
      {/if}
    {/each}
  </ul>
{:else}
  <span class="grey">keine Prüfungen geplant</span>
{/if}
