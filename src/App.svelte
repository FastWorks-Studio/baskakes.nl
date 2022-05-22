<script lang="ts">
  import Logo from "./components/Logo.svelte";

  $: videoUrl = getVideoUrl();

  function onResize() {
    const newVideoUrl = getVideoUrl();
    if (newVideoUrl == videoUrl) return;
    videoUrl = newVideoUrl;
  }

  function getVideoUrl() {
    const orientation =
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    return `./assets/video/bg_${orientation}.mp4`;
  }
</script>

<main>
  <Logo subtitle="work in progress" />
  <dimLayer />
  <video preload="none" src={videoUrl} autoplay muted loop />
</main>
<svelte:window on:resize={onResize} />

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

  dimLayer {
    position: absolute;
    inset: 0;
    z-index: -9;
    opacity: 0.8;
    background-color: var(--color-background);
  }

  video {
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -10;
    /* animation: var(--animation-recording); */
  }
</style>
