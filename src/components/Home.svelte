<script lang="ts">
  import { onMount } from "svelte";
  import { fetchContent } from "../lib/contentfulClient";
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

  type ContentEntry = Awaited<ReturnType<typeof fetchContent>>[number];

  let entries: ContentEntry[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      entries = await fetchContent();
    } catch (err) {
      error = (err as Error).message;
    } finally {
      loading = false;
    }
  });
</script>

<main>
  <h1>Contentful Content (Rich Text)</h1>

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    {#each entries as entry}
      <article>
        <h2>{entry.fields.title}</h2>
        <div>{@html renderRichText(data.content)}</div>
      </article>
    {/each}
  {/if}
</main>

<style>
  .rich-text p {
    margin-bottom: 1em;
  }

  .rich-text h1,
  .rich-text h2,
  .rich-text h3 {
    margin-top: 1.5em;
  }

  .rich-text ul,
  .rich-text ol {
    margin: 1em 0;
    padding-left: 1.5em;
  }

  .rich-text a {
    color: #007acc;
    text-decoration: underline;
  }
</style>
