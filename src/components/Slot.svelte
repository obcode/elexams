<script>
  import Exam from "./Exam.svelte";
  export let dayIndex;
  export let slotIndex;

  let exams = [];
  const fetchExams = async () => {
    let response = await fetch("http://localhost:8080/slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([dayIndex, slotIndex])
    });
    exams = await response.json();
  };
  fetchExams();
</script>

<h5>({dayIndex}, {slotIndex})</h5>

{#if exams.length !== 0}
  {#each exams as exam}
    <Exam {exam} />
  {/each}
{/if}
