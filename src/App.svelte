<script lang="ts">
  import Logo from "./components/Logo.svelte";
</script>

<main>
  <Logo subtitle="work in progress" />
  <video
    preload="none"
    src="./assets/video/showreel_liggend.mp4"
    autoplay
    muted
  />
</main>

<style>
  main {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: stretch;
    padding: 10vw;
    width: 100vw;
    height: 100vh;
    justify-content: center;
  }

  video {
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -10;
    opacity: 0.2;
  }
</style>
