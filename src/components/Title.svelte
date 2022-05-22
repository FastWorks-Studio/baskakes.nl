<script lang="ts">
</script>

<main>
  <h3 class="shadow"><slot /></h3>
  <h3><slot /></h3>
</main>

<style>
  main {
    position: relative;
  }

  h3.shadow {
    position: absolute;
    inset: 0;
    transform: translate(-0.03em, 0.03em);
    color: var(--color-pink);
    z-index: -1;
  }
</style>
