<script>
  import Validation from "./Validation.svelte";
  import Plan from "./Plan.svelte";
</script>

<style>
  td {
    vertical-align: 0pt;
  }
</style>

<main>
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
