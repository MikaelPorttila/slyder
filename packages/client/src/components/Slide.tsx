import type { Component } from "solid-js"
import type { SlideProps } from "./types/slide-props";
import { Switch, Match, createEffect, on } from "solid-js"
import { getPresentationContext } from "../context/presentation";
import { MimeGroup, Mime } from "../constants";
import styles from "./Slide.module.css";

export const Slide: Component<SlideProps & { active: any }> = (props) => {
    const [state, {setCurrentSlide}] = getPresentationContext();
    let slideElement: HTMLButtonElement;

/*     createEffect(on(props.active, () => {
        if (props.active) {
            requestAnimationFrame(() => {
                slideElement.scrollIntoView({ behavior: 'smooth', block: "nearest", inline: "nearest" });
            })
        }
    })); */

    createEffect(() => {
        if (props.active) {
            requestAnimationFrame(() => {
                slideElement.scrollIntoView({ behavior: 'smooth', block: "nearest", inline: "nearest" });
            })
        }
    })

    return (
        <button 
            ref={slideElement}
            type="button"
            class={styles.slide}
            classList={{ [styles.active]: props.active }}
            onClick={[setCurrentSlide, props.slide]}
            title={props.slide.fileName}
        >
            <div class={styles.slide__thumbnail}>
                <Switch fallback={<>📊</>}>
                    <Match when={ props.slide.type.startsWith(MimeGroup.Image) }>
                        <img 
                            src={props.slide.fileName + `?instance=${state.presentationId}`}
                            loading="eager"
                        ></img>
                    </Match>
                    <Match when={ props.slide.type.startsWith(MimeGroup.Video) }>
                        🎬
                    </Match>
                    <Match when={ props.slide.type == Mime.PlainText }>
                        📑
                    </Match>
                    <Match when={ props.slide.type.startsWith(MimeGroup.Application) }>
                        💾
                    </Match>
                </Switch>
            </div>
        </button>
    );
}