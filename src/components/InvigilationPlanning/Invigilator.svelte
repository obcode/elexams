<script>
  export let invigilatorID;
  export let dayIndex;

  import { onMount } from "svelte";
  import {
    invigilations,
    refetchInvigilator,
    fetchInvigilations
  } from "../../stores/invigilation.js";
  let invigilator;
  let want;
  let can;
  let notAvailable;
  let alreadyEnough;
  let draggable;

  $: {
    invigilator = $invigilations[1].find(i => i.invigilatorID == invigilatorID);
    setInvigilatorDetails(invigilator, dayIndex);
  }

  function setInvigilatorDetails(invigilator) {
    want =
      invigilator !== null &&
      invigilator !== undefined &&
      (invigilator.invigilatorWantDays.includes(dayIndex) ||
        invigilator.invigilatorInvigilationDays.includes(dayIndex));
    can =
      !want &&
      invigilator !== null &&
      invigilator !== undefined &&
      invigilator.invigilatorCanDays.includes(dayIndex);
    notAvailable = !want && !can;
    alreadyEnough =
      invigilator.invigilatorMinutesTodo -
        invigilator.invigilatorsMinutesPlanned <
      0;
    draggable = !notAvailable;
  }

  refetchInvigilator.subscribe(id => {
    if (id === invigilatorID) {
      fetchInvigilations();
    }
  });

  invigilations.subscribe(is => {
    invigilator = is[1].find(i => i.invigilatorID == invigilatorID);
    setInvigilatorDetails(invigilator);
  });

  let dragged = false;
  let draggedElement;

  function dragStart(event) {
    dragged = true;
    draggedElement = this;
    event.dataTransfer.setData(
      "invigilatorID",
      JSON.stringify(invigilator.invigilatorID)
    );
  }
  function dragEnd(event) {
    dragged = false;
    draggedElement = this;
  }
</script>

<style>
  td {
    padding: 4px;
  }
  .invigilator {
    font-size: 12px;
  }
  .want {
    background-color: rgb(11, 182, 11);
  }
  .can {
    background-color: yellow;
  }
  .alreadyEnough {
    background-color: orange;
  }
  .notAvailable {
    background-color: grey;
    color: darkgrey;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
  .dragged {
    border: solid black 4px;
  }
</style>

<tr
  class="invigilator"
  {draggable}
  class:dragged
  class:want
  class:can
  class:alreadyEnough
  class:notAvailable
  on:dragstart={dragStart}
  on:dragend={dragEnd}>
  <td>{invigilator.invigilatorName} </td>
  <td class="right">
     {invigilator.invigilatorMinutesTodo - invigilator.invigilatorsMinutesPlanned}

  </td>
  <td class="center"> {invigilator.invigilatorInvigilationDays} </td>
</tr>
