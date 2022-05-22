<script lang="ts">
  export let onClick: () => void;
</script>

<main on:click={onClick}>
  <p><slot /></p>
</main>

<style>
  main {
    padding: 0.5em 1em 1em 2em;
    border-radius: 100vh;
    text-align: center;
    border: 0.2em solid var(--color-red);
  }

  main:hover {
    background-color: var(--color-red);
  }

  p {
    color: var(--color-red);
    font-family: var(--font-body-bold);
  }

  p:hover {
    color: var(--color-white);
  }
</style>
