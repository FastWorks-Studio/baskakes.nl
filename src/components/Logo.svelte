<script lang="ts">
  $: name = "Bas Kakes";
</script>

<main>
  <container>
    <title>
      <h1>{name}</h1>
      <h1 class="shadow">{name}</h1>
    </title>
    <recdot />
    <corner class="topRight" />
    <corner class="bottomRight" />
    <corner class="topLeft" />
    <corner class="bottomLeft" />
  </container>
</main>

<style>
  :root {
    --color-corner: var(--color-pink);
    --width-corner: 2vw;
    --size-corner: 6vw;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-corner: var(--color-text);
    }
  }

  main {
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
  }

  container {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 5vw;
    padding-right: 10vw;
  }

  title {
    position: relative;
    display: flex;
    justify-content: center;
  }

  h1 {
    font-size: 18vw;
  }

  h1.shadow {
    position: absolute;
    inset: 0;
    z-index: -1;
    transform: translate(-1%, 2%);
    color: var(--color-pink);
  }

  recdot {
    position: absolute;
    border-radius: 50%;
    right: 4.5vw;
    bottom: 4.5vw;
    width: 3.2vw;
    height: 3.2vw;
    background-color: var(--color-red);
    animation: flickerAnimation 1s infinite;
  }

  corner {
    position: absolute;
    opacity: 0.3;
    height: var(--size-corner);
    width: var(--size-corner);
    border: var(--width-corner) solid var(--color-corner);
  }

  corner.topRight {
    right: 0;
    top: 0.5em;
    border-width: var(--width-corner) var(--width-corner) 0 0;
  }

  corner.bottomRight {
    right: 0;
    bottom: 0;
    border-width: 0 var(--width-corner) var(--width-corner) 0;
  }

  corner.topLeft {
    left: 0;
    top: 0.5em;
    border-width: var(--width-corner) 0 0 var(--width-corner);
  }

  corner.bottomLeft {
    left: 0;
    bottom: 0;
    border-width: 0 0 var(--width-corner) var(--width-corner);
  }

  @keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
</style>
