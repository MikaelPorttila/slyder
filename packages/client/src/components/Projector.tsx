import type { Component } from "solid-js";
import { Switch, Match, Show, onMount } from "solid-js"
import { getPresentationContext } from '../context/presentation';
import { 
    MetaProjector,
    ImageProjector,
    MarkdownProjector
} from './projectors';
import styles from "./Projector.module.css";
import Mousetrap from 'mousetrap';

export const Projector: Component = () => {
    const [state, {nextSlide, previousSlide}] = getPresentationContext();

    let projector;
    onMount(() => {
        Mousetrap.bind(['l', 'f5', 'f11'], (e) => {
            projector.requestFullscreen();
            e.preventDefault();
        });
        Mousetrap.bind('right', () => nextSlide());
        Mousetrap.bind('left', () => previousSlide());
    });

    return (
        <div ref={projector} class={styles.projector}>
            <Show when={!state.loading && state.currentSlide}>
                <Switch fallback={<MetaProjector slide={state.currentSlide}></MetaProjector>}>
                    <Match when={ state.currentSlide.type.startsWith('image/') }>
                        <ImageProjector slide={state.currentSlide}></ImageProjector>      
                    </Match>
                    <Match when={ state.currentSlide.type === 'text/markdown' }>
                        <MarkdownProjector slide={state.currentSlide}></MarkdownProjector>      
                    </Match>
                </Switch>
            </Show>
        </div>
    )
}