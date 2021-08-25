import { Component, onMount } from "solid-js";
import styles from "./App.module.css";
import { Navigator, Projector } from './components';
import { getPresentationContext } from "./context/presentation";
import { io } from "socket.io-client";
import { getInitalData } from "./services/content-service";
import { TimelineEntry } from "./types/timeline";

const App: Component = () => {
  const [state, { setPresentation, jumpTo  }] = getPresentationContext();
  onMount(async () => {
    const loadPresentation = async (jumpToStart: boolean = false, executeCommands: boolean = false) => {
      const [presentation, commands] = await getInitalData();
      setPresentation(presentation);

      if (executeCommands && commands.skip && commands.skip > 0) {
        jumpTo(commands.skip);
      }
      else if(jumpToStart) {
        jumpTo(0);
      }
    }

    const socket = io();
    let fetchDebounce;
    socket
      .on('data', (args) => {
        if (args.reload) {
          if (fetchDebounce) {
            clearTimeout(fetchDebounce);
          }
          fetchDebounce = setTimeout(async () => {
            let previousTimeEntry: TimelineEntry;
            if (state.timeline) {
              previousTimeEntry = {...state.timeline.entries[state.timeline.position]};
            }

            await loadPresentation();

            if (previousTimeEntry) {
              const matchingEntries = state.timeline.entries.filter(x => x.slideId === previousTimeEntry.slideId);
              const targetEntry = matchingEntries.find(entry => entry.position === previousTimeEntry.position) || matchingEntries?.[0]; 
              
              if (targetEntry) {
                jumpTo(state.timeline.entries.indexOf(targetEntry));
              }
            }
          }, 200);
        }
      })
      .on("disconnect", () => socket.connect())
      .connect();
      
      await loadPresentation(true, true);
  });

  return (
    <div class={styles.app}>
      <Navigator></Navigator>
      <Projector></Projector>
    </div>
  );
};

export default App;