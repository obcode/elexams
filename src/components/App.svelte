<script>
  import Validation from "./Validation.svelte";
  import Plan from "./Plan.svelte";
</script>

<style>
  body {
    overflow: auto;
  }
  h1 {
    font-family: "Arial";
    font-weight: 600;
    color: purple;
    margin: 2em auto;
    text-align: center;
  }
  td {
    vertical-align: 0pt;
  }
</style>

<main>
  <h1>Prüfungsplanung SS19</h1>
  <!-- <Exams/> -->
  <table>
    <tr>
      <td>
        <Plan />
      </td>
      <td>
        <Validation />
      </td>
    </tr>
  </table>
</main>
