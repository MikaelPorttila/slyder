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
    const [state, {next, back, jumpTo}] = getPresentationContext();

    let projector;
    onMount(() => {
        console.log('Projector mounted');
        Mousetrap.bind(['l', 'f5', 'f11'], (e) => {
            projector.requestFullscreen();
            e.preventDefault();
        });
        Mousetrap.bind('right', () => next());
        Mousetrap.bind('left', () => back());
        Mousetrap.bind('ctrl+right', () => jumpTo(state.timeline.length - 1));
        Mousetrap.bind('ctrl+left', () => jumpTo(0));
    });

    return (
        <div ref={projector} class={styles.projector}>
            <Show when={!state.loading && state.currentSlide}>
                <Switch fallback={<MetaProjector presentationId={state.presentationId} slide={state.currentSlide}></MetaProjector>}>
                    <Match when={ state.currentSlide.type.startsWith('image/') }>
                        <ImageProjector presentationId={state.presentationId} slide={state.currentSlide}></ImageProjector>      
                    </Match>
                    <Match when={ state.currentSlide.type === 'text/markdown' }>
                        <MarkdownProjector presentationId={state.presentationId} slide={state.currentSlide}></MarkdownProjector>      
                    </Match>
                </Switch>
            </Show>
        </div>
    )
}