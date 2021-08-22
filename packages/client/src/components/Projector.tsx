import type { Component } from "solid-js";
import { Switch, Match, Show, onMount } from "solid-js"
import { getPresentationContext } from '../context/presentation';
import styles from "./Projector.module.css";
import Mousetrap from 'mousetrap';

export const Projector: Component = () => {
    const [state, {nextSlide, previousSlide}] = getPresentationContext();

    let projector;
    onMount(() => {
        Mousetrap.bind(['l', 'f5'], (e, key) => {
            projector.requestFullscreen();
            e.preventDefault();
        });
        Mousetrap.bind('right', () => nextSlide());
        Mousetrap.bind('left', () => previousSlide());
    });

    return (
        <div ref={projector} class={styles.Projector}>
            <Show when={!state.loading && state.currentSlide}>
                <Switch fallback={<>{ state.currentSlide.fileName }</>}>
                    <Match when={ state.currentSlide.type.startsWith('image/') }>
                        <img src={state.currentSlide.fileName} title={state.currentSlide.fileName}></img>
                    </Match>
                </Switch>
            </Show>
        </div>
    )
}