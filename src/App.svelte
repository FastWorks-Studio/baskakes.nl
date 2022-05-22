<script lang="ts">
  import Button from "./components/Button.svelte";
  import Logo from "./components/Logo.svelte";
  import Title from "./components/Title.svelte";
  import Vimeo from "./components/Vimeo.svelte";

  $: innerWidth = 0;
  $: width = Math.min(
    Math.max(screen.width, screen.height) * 0.5,
    Math.max(innerWidth, 300)
  );

  $: videoUrl = getVideoUrl();
  let quote =
    "Ik wil de wereld van haar mooiste kant laten zien. Dit doe ik via mijn passie voor film.";

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

  function onClickPortfolio() {
    console.log(`did click portfolio`);
  }
</script>

<main style="width:{width}px">
  <Logo subtitle="brengt het in beeld" />
  <content>
    <p>{quote}</p>
    <Button onClick={onClickPortfolio}>bekijk mijn portfolio</Button>
    <Title>Showreel</Title>
    <Vimeo />
  </content>
  <video preload="none" src={videoUrl} autoplay muted loop />
</main>
<svelte:window on:resize={onResize} bind:innerWidth />

<style>
  main {
    margin: auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: stretch;
    padding: 3em;
    width: 100vw;
    justify-content: center;
  }

  content {
    padding-top: 3em;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 3em;
  }

  video {
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    opacity: 0.2;
    z-index: -10;
    filter: blur(1em);
  }
</style>
