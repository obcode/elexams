<script>
  import Nav from "../components/Nav.svelte";
  import fetch from "node-fetch";

  export let segment;
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
