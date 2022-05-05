<script>
  import Exam from "./Exam.svelte";
  import { refetchUnscheduled } from "../../stores/exams.js";
  let yes = true;
  let exams = [];
  const fetchUnscheduled = async () => {
    const response = await fetch("http://127.0.0.1:8080/unscheduledExams");
    exams = await response.json();
  };
  fetchUnscheduled();
  refetchUnscheduled.subscribe((_) => {
    console.log("refetching unscheduled");
    fetchUnscheduled();
  });
</script>

<label>
  <input type="checkbox" bind:checked={yes} />
  Show Unscheduled
</label>

{#if yes}
  <div class="unscheduled" />
  {#if exams.length === 0}
    Loading...
  {:else}
    {#each exams as exam}
      <Exam {exam} />
    {/each}
  {/if}
{/if}
