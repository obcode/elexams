<script>
  export let dayIndex;
  export let slotIndex;
  export let goSlot = false;

  import Exam from "./Exam.svelte";
  import { fetchValidation } from "../stores/main.js";
  import {
    refetchExams,
    conflictingAncodes,
    conflictingSlots,
    resetConflicting,
    clickedExamAnCode,
    setConflictingSlots
  } from "../stores/exams.js";

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
      exams = [];
      fetchExams();
    }
  });

  resetConflicting.subscribe(_ => {
    conflicting = false;
    maybeConflicting = false;
    notConflicting = false;
  });

  conflictingSlots.subscribe(allSlots => {
    conflicting = false;
    maybeConflicting = false;
    notConflicting = false;
    if (allSlots.length !== 0) {
      notConflicting = true;
      for (const slot of allSlots[0]) {
        if (slot[0] === dayIndex && slot[1] === slotIndex) {
          conflicting = true;
          return;
        }
      }
      for (const slot of allSlots[1]) {
        if (slot[0] === dayIndex && slot[1] === slotIndex) {
          maybeConflicting = true;
          return;
        }
      }
    }
  });

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
      // TODO: update von conflicts bei drag und drop funktioniert nicht richtig
      setConflictingSlots($clickedExamAnCode);
      conflictingAncodes.update(as => as);
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
        <Exam {exam} />
      {/each}
    {/if}
  </div>

</div>
