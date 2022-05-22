<script lang="ts">
  import Logo from "./components/Logo.svelte";
  import LogoSvg from "./components/Logo.svelte";
</script>

<main>
  <LogoSvg />
  <p>work in progress</p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: stretch;
    padding: 10vw;
    width: 100vw;
    height: 100vh;
    justify-content: center;
  }

  p {
    padding-top: 1vw;
    color: var(--color-red);
    font-size: 5vw;
    animation: var(--animation-recording);
  }
</style>
