<script>
  import { semesterConfig } from "../stores/main.js";
  import { dateString, weekend } from "../misc.js";
</script>

<style>
  .center {
    margin: auto;
    width: 90%;
    padding: 10px;
  }
  .roomTable {
    border-collapse: collapse;
    user-select: none;
    border: 1px solid black;
    vertical-align: top;
    font-size: 12px;
  }
  .times {
    width: 40px;
    background-color: rgb(176, 190, 197);
    text-align: center;
  }
  .days {
    background-color: rgb(176, 190, 197);
    text-align: center;
  }
  .weekend {
    background-color: rgb(176, 190, 197);
    min-width: 30px;
  }
</style>

{#if $semesterConfig === undefined || $semesterConfig === null}
  Loading...
{:else}
  <div class="center">
    <h1>Raumplanung</h1>
    <table>
      <tr>
        <td>
          <table class="roomTable">
            <tr class="roomTable">
              <th />
              {#each $semesterConfig.examDays as examDay, index}
                <th class="roomTable days">
                   {dateString(examDay)}
                  <br />
                  ({index})
                </th>
                {#if weekend(examDay)}
                  <th class="roomTable weekend" />
                {/if}
              {/each}
            </tr>
            {#each $semesterConfig.slotsPerDay as slot, slotIndex}
              <tr>
                <td class="roomTable times">
                   {slot}
                  <br />
                  ({slotIndex})
                </td>
                {#each $semesterConfig.examDays as examDay, dayIndex}
                  <td class="roomTable exams">
                    <div id="slot_{dayIndex}_{slotIndex}" class="slot">
                      <!-- <Slot
                      {dayIndex}
                      {slotIndex}
                      goSlot={isGOSlot(dayIndex, slotIndex)} /> -->
                    </div>
                  </td>
                  {#if weekend(examDay)}
                    <td class="roomTable weekend" />
                  {/if}
                {/each}
              </tr>
            {/each}
          </table>
        </td>
        <!-- <td class="validation">
        <Validation />
      </td> -->
      </tr>
    </table>
  </div>
{/if}
