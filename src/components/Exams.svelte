<script>
  let exams = [];
  const fetchExams = async () => {
    let response = await fetch("http://localhost:8080/exams");
    exams = await response.json();
  };
  fetchExams();
</script>

<h1>Exams</h1>

{#if exams.length === 0}
  <p>Exams loading...</p>
{:else}
  <ul>
    {#each exams as exam}
      <li>{exam.lecturer.personFullName}</li>
    {/each}
  </ul>
{/if}
