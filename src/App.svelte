<script lang="ts">
  import Button from "./components/Button.svelte";
  import Logo from "./components/Logo.svelte";
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
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<main style="width:{width}px">
  <Logo subtitle="brengt het in beeld" />
  <content>
    <imgContainer>
      <img
        class="badge"
        src="./assets/images/bas-kakes.jpg"
        alt="Foto van Bas Kakes"
      />
    </imgContainer>
    <space />
    <p>{quote}</p>
    <Button center={true} click={onClickPortfolio}>Bekijk mijn portfolio</Button
    >
    <h2>Showreel</h2>
    <Vimeo />
    <p>
      Voor mij moet het modern, visueel verantwoord en technisch perfect zijn;
      de kijker moet voelen wat ik voel. En dat geldt ook voor de mensen waarmee
      ik werk, want mijn kracht en passie komen bijeen door samen te werken aan
      prachtige filmprojecten.
    </p>
    <p class="bold">Ik ben filmregisseur, cameraman, en video-editor.</p>
    <p>
      Al van kleins af aan trommelde ik de hele buurt op om in mijn ‘films’ te
      spelen. Toen was ik al begonnen mezelf te ontwikkelen, en nog steeds leg
      ik de lat keer op keer hoger. Na een studie met specialisatie tot
      cameraman en video-editor (afgerond in 2015) was de basis gelegd om
      professionele projecten te kunnen realiseren.
    </p>
    <h2>Ter land, ter zee en in de lucht</h2>
    <p>
      Ik zorg dat ik met mijn camera op de juiste plaats en om de juiste tijd
      aanwezig ben om de mooiste shots te maken. Het vliegen met een drone of
      het maken van een duik in het water kunnen die unieke beelden opleveren
      die nodig zijn om het verhaal goed in beeld te brengen. Natuurlijk ben ik
      gecertificeerd bij de EASA op A1-A3 en A2-niveau voor het vliegen met de
      drone en bij PADI als Open Water Diver; rekening houden met veiligheid en
      lokale regelgeving zijn voor mij belangrijk.
    </p>
    <h2 id="portfolio">Portfolio</h2>
    <p>Dit zijn enkele van mijn afgeronde projecten.</p>
    <h3>Dordrecht door de jaren heen</h3>
    <p>
      Een documentaire over de stad waar ik vandaan kom. Deze film heb ik samen
      met mijn neef <a
        target="_blank"
        href="https://www.linkedin.com/in/coen-koopmans-3b15519a/"
        >Coen Koopmans</a
      >
      en goede vriend
      <a
        target="_blank"
        href="https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/"
        >Kevin van den Hoek</a
      > gemaakt. Het begon met het enorme enthousiasme voor Dordrecht van de opa
      van Coen en mijzelf. Dit wilde ik onderzoeken en is uitgedraaid tot een bioscoopfilm
      over de stad.
    </p>
    <a target="_blank" href="https://www.dordtfilm.nl/"
      >Meer over Dordrecht door de jaren heen</a
    >
    <a
      target="_blank"
      href="https://www.ad.nl/dordrecht/corona-gooide-eerder-roet-in-het-eten-maar-dordt-docu-is-straks-echt-te-zien-in-de-bioscoop~a26842e3/"
      >In het AD</a
    >
    <h3>BMW Nederland</h3>
    <p>
      Voor BMW maak ik diverse films van speciale evenementen die ze verzorgen. <i
        >BMW Privileges</i
      > (een programma voor klanten) biedt meerdere evenementen aan voor BMW-rijders.
      Dit varieert van luxe dinertjes tot het racen op Circuit Zandvoort. Zo’n evenement
      wordt door mij vastgelegd en verwerkt in een korte film.
    </p>
    <a
      target="_blank"
      href="https://www.bmw.nl/nl/content/aftersales/privileges/privileges.html#"
      >Bekijk mijn werk voor BMW Nederland</a
    >
    <a
      target="_blank"
      href="https://www.mini.nl/nl_NL/home/nog-meer-mini/mini-favours.html"
      >Bekijk mijn werk voor MINI Nederland</a
    >
    <h3>Rijkswaterstaat</h3>
    <p>
      Voor Rijkswaterstaat ben ik bezig geweest om diverse onderdelen in het
      bedrijf in beeld te brengen om begrip tussen afdelingen te vergroten.
    </p>
    <a target="_blank" href="https://www.youtube.com/watch?v=r2gcHdI4AJY"
      >Bekijk mijn werk voor Rijkswaterstaat</a
    >
    <h3>De Biesbosch: Grootse natuur in een klein land</h3>
    <p>
      De Biesbosch is een prachtig gebied en ligt praktisch in mijn achtertuin.
      Een uniek gebied waar ik graag ben en meer over te weten wil komen. Samen
      met onder andere Jacques van der Neut (oud-boswachter van de Biesbosch)
      maak ik een film over dit prachtige gebied.
    </p>

    <p>
      Natuurlijk ben ik beschikbaar voor onder ander bedrijfsvideo’s,
      commercials, videoclips en allerlei andere videoklussen. Zullen we
      samenwerken aan uw project?
    </p>
    <spacer />
    <Button click="mailto:info@baskakes.nl?subject=Samenwerken aan project"
      >Mail mij</Button
    >
    <Button click="https://www.linkedin.com/in/bas-kakes/">LinkedIn</Button>
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
    padding: 2rem;
    width: 100vw;
    justify-content: center;
  }

  content {
    padding-top: 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 2rem;
  }

  video {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    opacity: 0.2;
    z-index: -10;
    filter: blur(1em);
  }

  h2 {
    padding-top: 3rem;
  }

  h3 {
    padding-top: 2rem;
  }

  spacer {
    height: 2rem;
  }

  imgContainer {
    max-width: 30rem;
    max-height: 30rem;
    margin: 0 auto;
  }

  img.badge {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    box-shadow: 0 0 0 0.5rem var(--color-pink-secondary),
      0 0 0 1rem var(--color-pink);
  }
</style>
