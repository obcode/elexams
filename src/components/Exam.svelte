<script>
  export let exam;

  import {
    conflictingAncodes,
    clickedExamAnCode,
    conflictingSlots,
    setConflictingSlots,
    resetConflicting
  } from "../store.js";
  import { get } from "svelte/store";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const notPlannedByMe = !exam.plannedByMe;
  const draggable = exam.plannedByMe;
  const reExam = exam.reExam;
  let dragged = false;
  let invisible = false;
  let draggedElement;
  let conflicts;
  let conflicting = false;
  let studsWithConflicts = 0;
  let clicked = false;

  function setConflicts() {
    resetConflicting.update(x => x + 1);
    const c = get(conflictingAncodes);
    setConflictingSlots(exam.anCode);
    conflictingAncodes.set(exam.conflictingAncodes);
    clickedExamAnCode.set(exam.anCode);
  }

  clickedExamAnCode.subscribe(ac => {
    if (ac === exam.anCode) {
      clicked = true;
    } else {
      clicked = false;
    }
  });

  conflictingAncodes.subscribe(c => {
    clicked = false;
    conflicts = c;
    if (c !== null && c !== undefined) {
      for (const conflictingAncode of Object.keys(c)) {
        if (parseInt(conflictingAncode) === exam.anCode) {
          conflicting = true;
          studsWithConflicts = conflicts[conflictingAncode];
          dispatch("conflictingExam", null);
          return;
        }
      }
    }
    conflicting = false;
    studsWithConflicts = 0;
  });

  function dragStart(event) {
    dragged = true;
    draggedElement = this;
    event.dataTransfer.setData("exam", JSON.stringify(exam));
    event.dataTransfer.setData("elemid", event.target.id);
    setTimeout(() => (invisible = true), 0);
  }
  function dragEnd(event) {
    dragged = false;
    invisible = false;
    draggedElement = this;
  }
</script>

<style>
  .exam {
    font-size: 12px;
    display: inline-block;
    border: 2px rgb(226, 69, 12) solid;
    border-radius: 5px;
    width: 190px;
    background-color: lightgreen;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 2px;
  }
  .reExam {
    background-color: rgb(32, 206, 206);
  }
  .conflicting {
    background-color: crimson;
  }
  .conflictingStudents {
    font-weight: bold;
    float: right;
    background-color: yellow;
  }
  .dragged {
    border: solid black 4px;
  }
  .invisible {
    display: none;
  }
  .clicked {
    background-color: green;
  }

  .name {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.2s linear;
    padding: 0.2rem 0.2rem;
  }
  .name:focus,
  .name:hover {
    color: transparent;
  }
  .name:focus:after,
  .name:hover:after {
    content: attr(data-text);
    overflow: visible;
    text-overflow: inherit;
    background: #fff;
    position: absolute;
    left: auto;
    top: auto;
    width: auto;
    max-width: 20rem;
    border: 1px solid #eaebec;
    padding: 0 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.28);
    white-space: normal;
    word-wrap: break-word;
    display: block;
    color: black;
    margin-top: -1.25rem;
  }
  .personShortName {
    display: inline-block;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 120px;
    padding: 0;
  }
  .notPlannedByMe {
    background-color: slategrey;
  }
  .anCode {
    background-color: rgb(226, 69, 12);
    padding: 2px 2px 2px 2px;
    color: white;
    border: 2px rgb(226, 69, 12) solid;
    border-radius: 1px;
  }
  .studentCount {
    float: right;
    padding: 1px;
    border-left: 2px rgb(226, 69, 12) solid;
    border-bottom: 2px rgb(226, 69, 12) solid;
    border-radius: 1px;
  }
</style>

<div
  id={exam.anCode}
  class="exam"
  class:dragged
  class:invisible
  class:notPlannedByMe
  class:reExam
  class:clicked
  class:conflicting
  {draggable}
  on:dragstart={dragStart}
  on:dragend={dragEnd}
  on:click={setConflicts}>
  <span class="anCode">{exam.anCode}</span>
  <span class="personShortName" data-text={exam.lecturer.personShortName}>
     {exam.lecturer.personShortName}
  </span>
  <span class="studentCount">{exam.registeredStudentsCount}</span>
  <br />
  <span class="name" data-text={exam.name}>{exam.name}</span>
  {#if conflicting}
    Student-Conflicts:
    <span class="conflictingStudents">{studsWithConflicts}</span>
  {:else}
    <br />
    <span class="empty" />
  {/if}
</div>
