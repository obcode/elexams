<script>
  import Exam from "./Exam.svelte";
  import { fetchValidation, refetchExams } from "../store.js";
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

  refetchExams.subscribe(v => {
    if (v[0] === dayIndex && v[1] === slotIndex) {
      console.log(`fetching exams for slot (${dayIndex}, ${slotIndex})`);
      exams = [];
      fetchExams();
    }
  });

  let draggedOver = false;
  function dragOver(event) {
    event.preventDefault();
  }

  function dragEnter(event) {
    event.preventDefault();
    draggedOver = true;
  }

  function dragLeave() {
    event.preventDefault();
    draggedOver = false;
  }

  function dragDrop(event) {
    event.preventDefault();
    draggedOver = false;
    const exam = JSON.parse(event.dataTransfer.getData("exam"));
    fetch("http://localhost:8080/addExam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        planManipAnCode: exam.anCode,
        planManipDay: dayIndex,
        planManipSlot: slotIndex
      })
    }).then(() => {
      refetchExams.set([exam.slot[0], exam.slot[1]]);
      fetchExams();
      fetchValidation();
    });
  }
</script>

<style>
  .exams {
    height: 100%;
  }
  .draggedOver {
    background-color: orangered;
  }
</style>

<h5>({dayIndex}, {slotIndex})</h5>

<div
  class="exams"
  class:draggedOver
  on:dragover={dragOver}
  on:dragenter={dragEnter}
  on:dragleave={dragLeave}
  on:drop={dragDrop}>
  {#if exams.length !== 0}
    {#each exams as exam}
      <Exam {exam} />
    {/each}
  {/if}
</div>
