<script>
  export let dayIndex;
  export let slotIndex;

  import {
    slotsForDay,
    refetch,
    fetchInvigilations,
  } from "../../stores/invigilation.js";
  import { fetchValidation } from "../../stores/main.js";

  let slot = [];
  let reserveInvigilator = null;
  let hasInvigilator = reserveInvigilator !== null;
  let needsInvigilator = true;

  $: setDetails($slotsForDay, dayIndex, slotIndex);

  slotsForDay.subscribe((s) => {
    slot = [];
    reserveInvigilator = null;
    setDetails(s);
  });

  function setDetails(s) {
    if (s !== null && s !== undefined && s.length > 1) {
      slot = s.find((sl) => sl[0][0] == dayIndex && sl[0][1] == slotIndex);
    }
    if (slot !== undefined && slot !== null && slot.length > 0) {
      needsInvigilator = Object.entries(slot[1].examsInSlot).length !== 0;
      reserveInvigilator = slot[1].reserveInvigilator;
    }
    hasInvigilator = reserveInvigilator !== null;
  }

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
    const invigilatorID = JSON.parse(
      event.dataTransfer.getData("invigilatorID")
    );
    const invigilation = {
      addInvigilatorID: invigilatorID,
      addInvigilatorSlot: [dayIndex, slotIndex],
      addInvigilatorRoom: null,
    };
    fetch("http://127.0.0.1:8080/addInvigilator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invigilation),
    }).then(() => {
      refetch.update((i) => i + 1);
      fetchInvigilations();
      fetchValidation("ValidateInvigilation");
    });
  }
</script>

{#if needsInvigilator}
  {#if slot !== null && slot !== undefined && slot.length > 0}
    <div
      class="missing"
      class:draggedOver
      class:hasInvigilator
      on:dragover={dragOver}
      on:dragenter={dragEnter}
      on:dragleave={dragLeave}
      on:drop={dragDrop}
    >
      ({slot[0][0]}, {slot[0][1]})
      <br />
      Reserve:
      {#if hasInvigilator}{reserveInvigilator.invigilatorName}{:else}fehlt{/if}
    </div>
  {/if}
{/if}

<style>
  .draggedOver {
    background-color: green;
  }
  .missing {
    background-color: red;
  }
  .hasInvigilator {
    background-color: lightgreen;
  }
</style>
