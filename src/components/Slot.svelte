<script>
  import Exam from "./Exam.svelte";
  import {
    fetchValidation,
    refetchExams,
    conflictingAncodes,
    conflictingSlots
  } from "../store.js";
  export let dayIndex;
  export let slotIndex;
  export let goSlot = false;

  let exams = [];
  let studentCount = 0;
  let conflicting = false;
  let maybeConflicting = false;
  let notConflicting = false;

  const fetchExams = async () => {
    const response = await fetch("http://localhost:8080/slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([dayIndex, slotIndex])
    });
    exams = await response.json();
    studentCount = exams.reduce((acc, exam) => {
      if (exam.plannedByMe) return acc + exam.registeredStudentsCount;
      else return acc;
    }, 0);
  };
  fetchExams();

  refetchExams.subscribe(v => {
    if (v.length === 0 || (v[0] === dayIndex && v[1] === slotIndex)) {
      console.log(`fetching exams for slot (${dayIndex}, ${slotIndex})`);
      exams = [];
      fetchExams();
    }
  });

  conflictingSlots.subscribe(slots => {
    maybeConflicting = false;
    notConflicting = false;
    if (slots.length !== 0) {
      notConflicting = true;
    }
    for (const slot of slots) {
      if (slot[0] === dayIndex && slot[1] === slotIndex) {
        maybeConflicting = true;
        return;
      }
    }
  });

  function setConflicting(event) {
    conflicting = true;
  }

  conflictingAncodes.subscribe(conflicts => {
    if (
      conflicts === null ||
      conflicts === undefined ||
      conflicts.length === 0
    ) {
      conflicting = false;
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
  .slot {
    height: 100%;
    padding: 0px;
  }
  .exams {
    margin: 0px;
  }
  .draggedOver {
    background-color: orangered;
  }
  .goSlot {
    background-color: grey;
  }
  .notConflicting {
    background-color: green;
  }
  .maybeConflicting {
    background-color: yellow;
  }
  .conflicting {
    background-color: crimson;
  }
</style>

<div
  class="slot"
  class:goSlot
  class:notConflicting
  class:maybeConflicting
  class:conflicting
  on:dragover={dragOver}
  on:dragenter={dragEnter}
  on:dragleave={dragLeave}
  on:drop={dragDrop}>

  <span>
    ({dayIndex}, {slotIndex})
    {#if studentCount !== 0}- {studentCount} Studs{/if}
  </span>

  <div class="exams" class:draggedOver class:goSlot class:conflicting>
    {#if exams.length !== 0}
      {#each exams as exam}
        <Exam {exam} on:conflictingExam={setConflicting} />
      {/each}
    {/if}
  </div>

</div>
