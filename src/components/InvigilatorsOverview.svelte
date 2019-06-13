<script>
  import { invigilations, fetchInvigilations } from "../stores/invigilation.js";
  import InvigilatorTR from "./InvigilatorTR.svelte";
  fetchInvigilations();
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
  }
</style>

{#if $invigilations === null || $invigilations === undefined || $invigilations.length === 0}
  Loading...
{:else}
  <ul>
    <li>
      Aufsicht in Prüfungsräumen: {$invigilations[0].invigilationsSumExamRooms}
      Minuten
    </li>
    <li>
      Reserveaufsichten: {$invigilations[0].invigilationsSumReserve} Minuten
    </li>
    <li>Live-Coding: {$invigilations[0].invigilationsSumLivecoding} Minuten</li>
    <li>
      Mündliche Prüfungen: {$invigilations[0].invigilationsSumOralExams} Minuten
    </li>
    <li>
      Master Gespräche: {$invigilations[0].invigilationsSumMaster} Minuten
    </li>
  </ul>
  <table>
    <thead>
      <tr>
        <th>Nr.</th>
        <th>ID</th>
        <th>Name</th>
        {#each $semesterConfig.examDays as _, i}
          <th>{i}</th>
        {/each}
        <th>Prüfungstage</th>
        <th>gewünschte Tage</th>
        <th>mögliche Tage</th>
        <th>ausgeschlossene Tage</th>
        <th>geplante Tage</th>
        <th>zu leistende Zeit</th>
        <th>eingeplante Zeit</th>
        <th>noch offen</th>
        <th>Teilzeit</th>
        <th>Beisitzer</th>
        <th>Master</th>
        <th>Livecoding</th>
        <th>mehr im letzten Semester</th>
        <th>mehr dieses Semester</th>
        <th>Freisemester</th>
      </tr>
    </thead>
    {#each $invigilations[1] as invigilator, index}
      <InvigilatorTR {invigilator} {index} />
    {/each}
  </table>
{/if}
