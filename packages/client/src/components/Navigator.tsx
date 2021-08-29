import type { Component } from "solid-js";
import { For } from "solid-js";
import { getPresentationContext } from '../context/presentation';
import { Slide } from './';
import styles from "./Navigator.module.css";

export const Navigator: Component = () => {
    const [state] = getPresentationContext();
    return (
        <div class={styles.navigator}> 
            <For each={state.slides} fallback={<div>Loading</div>}>
                {(slide) => <Slide active={state?.currentSlide?.fileName === slide.fileName} presentationId={state.presentationId} slide={slide}></Slide> }
            </For>
        </div>
    )
}