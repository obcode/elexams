<script>
  import { onMount } from "svelte";

  import InvigilatorsOverview from "../components/InvigilationPlanning/InvigilatorsOverview.svelte";
  import InvigilationDay from "../components/InvigilationPlanning/InvigilationDay.svelte";
  import Validation from "../components/Validation.svelte";
  import { fetchInvigilations, refetch } from "../stores/invigilation.js";
  import { semesterConfig, validation } from "../stores/main.js";
  import { dateString } from "../misc.js";
  let dayIndex = -1; // TODO set -1

  onMount(() => fetchInvigilations());

  // function refresh() {
  //   // fetchInvigilations()
  //   // refetch.update(i => i+1)
  // }
</script>

<style>
  tr,
  td {
    vertical-align: top;
  }
  .eighty {
    width: 80%;
  }
  .twenty {
    width: 20%;
  }
</style>

<h1>Aufsichtenplanung</h1>

{#if $semesterConfig !== null && $semesterConfig !== undefined && $semesterConfig.examDays.length > 0}
  Aufsichten planen:
  <select bind:value={dayIndex} name="ancode" id="ancode">
    <option value="-1">Übersicht</option>
    {#each $semesterConfig.examDays as day, index}
      <option value={index}>({index}) {dateString(day)}</option>
    {/each}
  </select>
{/if}
<table>
  <tr>
    <td class="eighty">
      {#if dayIndex == -1}
        <InvigilatorsOverview />
      {:else}
        <InvigilationDay {dayIndex} />
      {/if}
    </td>
    <td class="twenty">
      <Validation validateWhat="ValidateInvigilation" />
    </td>
  </tr>
</table>
