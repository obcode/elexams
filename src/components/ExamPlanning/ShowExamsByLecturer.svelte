<script>
  import { selectedLecturer, lecturers } from "../../stores/lecturers.js";
  let selected = 0;
  function setSelected() {
    selectedLecturer.set(selected);
  }
</script>

<style>
  select {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-color: aqua;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
  }
  select:hover {
    border-color: #888;
  }
  select:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
</style>

{#if $lecturers.length > 0}
  Zeige Prüfungen von
  <select
    bind:value={selected}
    on:change={setSelected}
    name="lecturer"
    id="lecturer">
    <option value="0">Prüfer</option>
    {#each $lecturers as lecturer}
      <option class={lecturer.personFK} value={lecturer.personID}>
         {lecturer.personShortName}
        {#if lecturer.personIsLBA}(LBA){/if}
      </option>
    {/each}
  </select>
{/if}
