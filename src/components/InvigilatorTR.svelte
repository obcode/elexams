<script>
  export let invigilator;
  export let index;
  const missingConstraints = !invigilator.invigilatorHasConstraints;
  const enough =
    invigilator.invigilatorMinutesTodo -
      invigilator.invigilatorsMinutesPlanned <=
    60;
  import { semesterConfig } from "../stores/main.js";
</script>

<style>
  table,
  tr,
  td,
  th {
    border-collapse: collapse;
    user-select: none;
    border: 1px solid black;
    vertical-align: top;
    font-size: 12px;
    text-align: center;
  }
  .green {
    background-color: green;
  }
  .yellow {
    background-color: yellow;
  }
  .red {
    background-color: red;
  }
  .enough {
    background-color: grey;
  }
  .missingConstraints {
    background-color: red;
  }
</style>

<tr class:missingConstraints class:enough>
  <td>{index + 1}</td>
  <td>{invigilator.invigilatorID}</td>

  <td>{invigilator.invigilatorName}</td>
  {#each $semesterConfig.examDays as _, i}
    {#if invigilator.invigilatorWantDays.includes(i)}
      <td class="green" />
    {:else if invigilator.invigilatorCanDays.includes(i)}
      <td class="yellow" />
    {:else}
      <td class="red" />
    {/if}
  {/each}
  <td>{invigilator.invigilatorExamDays}</td>
  <td>{invigilator.invigilatorWantDays}</td>
  <td>{invigilator.invigilatorCanDays}</td>
  <td>{invigilator.invigilatorExcludedDays}</td>
  <td>{invigilator.invigilatorInvigilationDays}</td>
  <td>{invigilator.invigilatorMinutesTodo}</td>
  <td>
    {#if invigilator.invigilatorsMinutesPlanned !== 0}
      {invigilator.invigilatorsMinutesPlanned}
    {/if}
  </td>
  <td>
     {invigilator.invigilatorMinutesTodo - invigilator.invigilatorsMinutesPlanned}

  </td>
  <td>
    {#if invigilator.invigilatorPartTime !== 1}
      {invigilator.invigilatorPartTime}
    {/if}
  </td>
  <td>
    {#if invigilator.invigilatorOralExams !== 0}
      {invigilator.invigilatorOralExams}
    {/if}
  </td>
  <td>
    {#if invigilator.invigilatorMaster !== 0}
      {invigilator.invigilatorMaster}
    {/if}
  </td>
  <td>
    {#if invigilator.invigilatorLiveCoding !== 0}
      {invigilator.invigilatorLiveCoding}
    {/if}
  </td>
  <td>
    {#if invigilator.invigilatorOvertimeLastSemester !== 0}
      {invigilator.invigilatorOvertimeLastSemester}
    {/if}
  </td>
  <td>
    {#if invigilator.invigilatorOvertimeThisSemester !== 0}
      {invigilator.invigilatorOvertimeThisSemester}
    {/if}
  </td>
  <td>
    {#if invigilator.invigilatorFreeSemester}
      {invigilator.invigilatorFreeSemester}
    {/if}
  </td>
</tr>
