import { Component, onMount } from "solid-js";
import styles from "./App.module.css";
import { Navigator, Projector } from './components';
import { getPresentationContext } from "./context/presentation";
import { Presentation, Slide } from "./types";
import { mapSlide } from './mappers/slide-mapper';

const App: Component = () => {
  const [state, { setPresentation }] = getPresentationContext();
  onMount(async () => {
    const data: [] = await (await fetch('/api/data')).json();
    const slides = data.map(x => mapSlide(x));

    setPresentation({
      name: 'test',
      loading: false,
      length: slides.length,
      slides
    } as Presentation);
  });

  return (
    <div class={styles.App}>
      <Navigator></Navigator>
      <Projector></Projector>
    </div>
  );
};

export default App;