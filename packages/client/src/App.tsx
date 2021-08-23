import { Component, onMount } from "solid-js";
import styles from "./App.module.css";
import { Navigator, Projector } from './components';
import { getPresentationContext } from "./context/presentation";
import { Presentation } from "./types";
import { mapSlide } from './mappers/slide-mapper';
import { io } from "socket.io-client";

const App: Component = () => {
  const [, { setPresentation }] = getPresentationContext();
  onMount(async () => {
    const loadPresentation = async () => {
      const data: [] = await (await fetch('/api/data')).json();
      const slides = data.map(x => mapSlide(x));
      setPresentation({
        name: 'test',
        loading: false,
        length: slides.length,
        slides,
        currentSlide: slides?.[0]
      } as Presentation);
    }

    const socket = io();

    let fetchTimer;
    socket
      .on('data', (args) => {
        if (args.reload) {
          if (fetchTimer) {
            clearTimeout(fetchTimer);
          }
          
          fetchTimer = setTimeout(async () => {
            await loadPresentation();
          }, 200);
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