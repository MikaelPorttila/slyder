import type { Component } from "solid-js"
import type { SlideProps } from "./types/slide-props";
import { Switch, Match, createEffect } from "solid-js"
import { getPresentationContext } from "../context/presentation";
import { MimeGroup, Mime } from "../constants";
import styles from "./Slide.module.css";

export const Slide: Component<SlideProps> = ({ slide }) => {
    const [state, {setCurrentSlide}] = getPresentationContext();
    let slideElement: HTMLButtonElement;

    createEffect(() => {
        if(state?.currentSlide?.fileName === slide.fileName && slideElement) {
            slideElement.scrollIntoView({ behavior: 'smooth', block: "nearest", inline: "nearest" });
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
                    <Match when={ slide.type.startsWith(MimeGroup.Image) }>
                        <img 
                            src={slide.fileName + `?instance=${state.presentationId}`}
                            loading="eager"
                        ></img>
                    </Match>
                    <Match when={ slide.type.startsWith(MimeGroup.Video) }>
                        🎬
                    </Match>
                    <Match when={ slide.type == Mime.PlainText }>
                        📑
                    </Match>
                    <Match when={ slide.type.startsWith(MimeGroup.Application) }>
                        💾
                    </Match>
                </Switch>
            </div>
        </button>
    );
}