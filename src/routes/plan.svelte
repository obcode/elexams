<script>
  import { semesterConfig } from "../stores/main.js";
  import { dateString, weekend } from "../misc.js";
  import Slot from "../components/Plan/Slot.svelte";
</script>

{#if $semesterConfig === undefined || $semesterConfig === null}
  Loading...
{:else}
  <ul>
    {#each $semesterConfig.examDays as examDay, dayIndex}
      <hr />
      <li>
        {dateString(examDay)}
        <ul>
          {#each $semesterConfig.slotsPerDay as slot, slotIndex}
            <li>
              <hr />
              {slot}
              <Slot {dayIndex} {slotIndex} />
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
{/if}
