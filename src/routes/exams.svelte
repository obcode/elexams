<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch("http://127.0.0.1:8080/exams");
    const data = await res.json();

    if (res.status === 200) {
      return { inputExams: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let inputExams;
  let exams = inputExams;
  let currentFilter = "anCode",
    prevFilter = "",
    orderAsc = true;
  const toggleOrder = () => {
    if (currentFilter === prevFilter) {
      orderAsc = !orderAsc; // Get same value and assign its opposite.
    } else {
      orderAsc = true;
    }
  };
  const sortTable = (array, sortKey) => {
    return array.sort((a, b) => {
      const x = a[sortKey],
        y = b[sortKey];
      return orderAsc ? x - y : y - x; // ternary operator
    });
  };
  function sort(key) {
    console.log(`clicked ${key}`);
    currentFilter = key;
    exams = sortTable(exams, key);
  }
  function sortName() {
    sort("name");
  }
</script>

<h1>Prüfungsliste</h1>

{#if exams !== null && exams !== undefined}
  <table>
    <tr>
      <th>
        <span
          class:active={currentFilter === "anCode"}
          on:click={sort("anCode")}
        >
          AnCode
        </span>
      </th>
      <th class:active={currentFilter === "name"} on:click={sortName}>Name</th>
      <th
        class:active={currentFilter === "lecturer"}
        on:click={sort("lecturer")}
      >
        PrüferIn
      </th>
    </tr>
    {#each exams as exam}
      <tr class:grey={!exam.plannedByMe}>
        <td>{exam.anCode}</td>
        <td>{exam.name}</td>
        <td>{exam.lecturer.personShortName}</td>
      </tr>
    {/each}
  </table>
{:else}
  <h2>Loading...</h2>
{/if}

<style>
  th {
    cursor: pointer;
  }
  th.active {
    color: red;
  }
  tr.grey {
    color: grey;
  }
</style>
