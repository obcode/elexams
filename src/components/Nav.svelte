<script>
  export let segment;
  import { semesterConfig } from "../stores/main.js";
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <a class:selected={segment === undefined} href=".">
        Prüfungsplan
        {#if $semesterConfig === undefined || $semesterConfig === null}
          ..
        {:else}
          <strong>{$semesterConfig.semester}</strong>
        {/if}
      </a>
    </li>
    <li>
      <a class:selected={segment === 'rooms'} href="rooms">Raumplanung</a>
    </li>
    <li>
      <a class:selected={segment === 'exams'} href="exams">Prüfungsliste</a>
    </li>
    <li>
      <a class:selected={segment === 'invigs'} href="invigs">
        Aufsichtenplanung
      </a>
    </li>
    <li>
      <a class:selected={segment === 'nta'} href="nta">Nachteilsausgleich</a>
    </li>
    <li>
      <a class:selected={segment === 'plan'} href="plan">
        Prüfungsplan - chronologisch
      </a>
    </li>
  </ul>
</nav>
