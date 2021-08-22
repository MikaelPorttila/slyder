import { Component, onMount } from "solid-js";
import styles from "./App.module.css";
import { Navigator, Projector } from './components';
import { getPresentationContext } from "./context/presentation";
import { Presentation, Slide } from "./types";

const App: Component = () => {
  const [state, { setPresentation }] = getPresentationContext();
  onMount(async () => {
    const fileNames = await (await fetch('/api/data')).json() as string[];
    setPresentation({
      name: 'test',
      loading: false,
      length: fileNames.length,
      slides: fileNames.map(x => ({ fileName: x })) as Slide[]
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