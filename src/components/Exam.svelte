<script>
  export let exam;

  let dragged = false;
  let invisible = false;
  let draggedElement;

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
    display: inline-block;
    margin: 2px;
    padding: 2px;
    border: 2px salmon solid;
    width: 100%;
    background-color: lightgreen;
  }
  .dragged {
    border: solid black 4px;
  }

  .invisible {
    display: none;
  }
</style>

<div
  id={exam.anCode}
  class="exam"
  class:dragged
  class:invisible
  draggable="true"
  on:dragstart={dragStart}
  on:dragend={dragEnd}>
   {exam.name}
</div>
