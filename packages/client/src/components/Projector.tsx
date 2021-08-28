import type { Component } from "solid-js";
import { Switch, Match, Show, onMount } from "solid-js"
import { getPresentationContext } from '../context/presentation';
import { Mime, FileExtension, MimeGroup } from '../constants';

import { Controls } from './Controls';
import { 
    MetaProjector,
    ImageProjector,
    HtmlProjector,
    FrameProjector,
    VideoProjector
} from "./projectors";
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
                    <Match when={ state.currentSlide.type.startsWith(MimeGroup.Image) }>
                        <ImageProjector presentationId={state.presentationId} slide={state.currentSlide}></ImageProjector>      
                    </Match>
                    <Match when={ state.currentSlide.type === Mime.Markdown }>
                        <HtmlProjector presentationId={state.presentationId} slide={state.currentSlide}></HtmlProjector>      
                    </Match>
                    <Match when={ state.currentSlide.fileExtension.endsWith(FileExtension.Url) }>
                        <FrameProjector presentationId={state.presentationId} slide={state.currentSlide}></FrameProjector>      
                    </Match>
                    <Match when={ state.currentSlide.type.startsWith(MimeGroup.Video) }>
                        <VideoProjector presentationId={state.presentationId} slide={state.currentSlide}></VideoProjector>      
                    </Match>
                </Switch>
            </Show>
            {/* <div class={styles.projectionControl}>
                <Controls></Controls>
            </div> */}
        </div>
    )
}