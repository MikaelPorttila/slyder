import { Component, onMount } from "solid-js";
import styles from "./App.module.css";
import { Navigator, Projector } from './components';
import { getPresentationContext } from "./context/presentation";
import { Presentation } from "./types";
import { mapSlide } from './mappers/slide-mapper';
import { mapTimeline } from './mappers/timeline-mapper';
import { io } from "socket.io-client";

const App: Component = () => {
  const [, { setPresentation, jumpTo }] = getPresentationContext();
  onMount(async () => {
    const loadPresentation = async () => {
      const data: [] = await (await fetch('/api/data')).json();
      const slides = data.map(x => mapSlide(x));
      const timeline = mapTimeline(slides);
      setPresentation({
        name: 'test',
        loading: false,
        length: slides.length,
        slides,
        timeline
      } as Presentation);
      jumpTo(0);
      console.table(timeline.entries)
    }

    const socket = io();
    let fetchDebounce;
    socket
      .on('data', (args) => {
        if (args.reload) {
          if (fetchDebounce) {
            clearTimeout(fetchDebounce);
          }
          fetchDebounce = setTimeout(async () => await loadPresentation(), 200);
        }
      })
      .on("disconnect", () => socket.connect())
      .connect();
      
      await loadPresentation();
  });

  return (
    <div class={styles.app}>
      <Navigator></Navigator>
      <Projector></Projector>
    </div>
  );
};

export default App;