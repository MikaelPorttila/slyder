import type { Component } from "solid-js"
import { Switch, Match, createEffect } from "solid-js"
import { getPresentationContext } from "../context/presentation";
import styles from "./Slide.module.css";
import type { SlideProps } from "./types/slide-props";

export const Slide: Component<SlideProps> = ({ slide }) => {
    const [state, {setCurrentSlide}] = getPresentationContext();
    let slideElement;

    createEffect(() => {
        if(state?.currentSlide?.fileName === slide.fileName && slideElement) {
            (slideElement as any).scrollIntoViewIfNeeded();
        }
    })

    return (
        <button 
            ref={slideElement}
            type="button"
            class={styles.slide}
            classList={{ [styles.active]: state?.currentSlide?.fileName === slide.fileName }}
            onClick={[setCurrentSlide, slide]}
            title={slide.fileName}
        >
            <div class={styles.slide__thumbnail}>
                <Switch fallback={<>📊</>}>
                    <Match when={ slide.type.startsWith('image/') }>
                        <img src={slide.fileName}></img>
                    </Match>
                </Switch>
            </div>
        </button>
    );
}