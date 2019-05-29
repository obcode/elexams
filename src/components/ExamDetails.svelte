<script>
  import { clickedExamAnCode } from "../store.js";
  let yes = true;
  let exam;
  clickedExamAnCode.subscribe(ac => {
    fetchExam(ac);
  });
  async function fetchExam(ancode) {
    let response = await fetch("http://localhost:8080/exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ancode)
    });
    exam = await response.json();
  }
</script>

<style>
  .examName {
    font-size: 24px;
  }
</style>

<label>
  <input type="checkbox" bind:checked={yes} />
  Zeige Details zur ausgewählten Prüfung
  <br />
</label>

{#if yes && exam !== undefined && exam !== null}
  <span class="examName">{exam.name}</span>
  <br />
  <span class="examLecturer">{exam.lecturer.personFullName}</span>
  <br />
  {#each exam.registeredGroups as registeredGroup, index}
    {#if index > 0},{/if}
     {registeredGroup.registeredGroupDegree} ({registeredGroup.registeredGroupStudents})
  {/each}
  {#if Object.keys(exam.conflictingAncodes).length > 0}
    <br />
    <span>
      Konflikte zu {Object.keys(exam.conflictingAncodes).length} anderen
      Prüfungen
    </span>
  {/if}
{/if}
