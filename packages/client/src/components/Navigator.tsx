import type { Component } from "solid-js";
import { For } from "solid-js";
import { getPresentationContext } from '../context/presentation';
import { Slide } from './';
import styles from "./Navigator.module.css";

export const Navigator: Component = () => {
    const [state, {setCurrentSlide}] = getPresentationContext();

    return (
        <div class={styles.Navigator}>
            <div>
                <For each={state.slides} fallback={ <div>Loading</div> }>
                    {(slide) =>
                        <Slide
                            onClick={(e) => console.log(e.currentTarget)}
                            /* onClick={() => setCurrentSlide(slide)} */
                            slide={slide}
                        ></Slide>
                    }
                </For>
                
            </div>
        </div>
    )
}