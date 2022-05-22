<script lang="ts">
  export let click: (() => void) | string;
  export let center: boolean = false;

  function onClick() {
    if (typeof click === "string") {
      const link = click as string;
      window.open(link);
    } else {
      const action = click as () => void;
      action();
    }
  }
</script>

<main
  on:click={onClick}
  style="margin: {center ? '0 auto 0 auto' : '0 auto 0 0'}"
>
  <p><slot /></p>
</main>

<style>
  main {
    padding: 1rem 1.5rem 1.4rem 1.5rem;
    border-radius: 100vh;
    text-align: center;
    border: 0.25rem solid var(--color-red);
    cursor: pointer;
    margin: 0 auto 0 auto;
    min-width: 20rem;
  }

  main:hover,
  main:active {
    background-color: var(--color-red);
  }

  main:hover > p,
  main:active > p {
    color: var(--color-white);
  }

  p {
    color: var(--color-red);
    font-family: var(--font-body-bold);
  }
</style>
