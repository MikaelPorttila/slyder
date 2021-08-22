import type { Component } from "solid-js";
import { For } from "solid-js";
import { getPresentationContext } from '../context/presentation';
import { Slide } from './';
import styles from "./Navigator.module.css";

export const Navigator: Component = () => {
    const [state, {}] = getPresentationContext();

    return (
        <div class={styles.Navigator}>
            <div>
                <For each={state.slides} fallback={ <div>Loading</div> }>
                    {(slide) =>
                        <Slide slide={slide} ></Slide>
                    }
                </For>
                
            </div>
        </div>
    )
}