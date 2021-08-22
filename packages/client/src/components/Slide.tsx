import type { Component } from "solid-js"
import { Switch, Match } from "solid-js"
import { getPresentationContext } from "../context/presentation";
import styles from "./Slide.module.css";
import type { SlideProps } from "./types/slide-props";

export const Slide: Component<SlideProps> = (props) => {
    const [state, {setCurrentSlide}] = getPresentationContext();
    const { fileName, type } = props.slide;
    return (
        <button 
            type="button"
            class={styles.Slide}
            classList={{ [styles.active]: state?.currentSlide?.fileName === fileName }}
            onClick={[setCurrentSlide, props.slide]}
        >
            <Switch fallback={<>{ fileName }</>}>
                <Match when={ type.startsWith('image/') }>
                    <img src={fileName} title={fileName}></img>
                </Match>
            </Switch>
        </button>
    );
}