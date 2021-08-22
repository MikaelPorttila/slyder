import type { Component } from "solid-js";
import { Switch, Match, Show } from "solid-js"
import { getPresentationContext } from '../context/presentation';
import styles from "./Projector.module.css";

export const Projector: Component = () => {
    const [state, {}] = getPresentationContext();
    return (
        <div class={styles.Projector}>
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