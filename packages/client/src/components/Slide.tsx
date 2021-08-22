import { Component, Switch, Match } from "solid-js"
import { getPresentationContext } from "../context/presentation";
import type { Slide as SlideEntry } from './../types';
import styles from "./Slide.module.css";

interface SlideProps {
    slide: SlideEntry
}

export const Slide: Component<SlideProps> = (props) => {
    const [, {setCurrentSlide}] = getPresentationContext();
    const { fileName, type } = props.slide;
    return (
        <button type="button" class={styles.Slide} onClick={[setCurrentSlide, props.slide]}>
            <Switch fallback={<>{ fileName }</>}>
                <Match when={ type.startsWith('image/') }>
                    <img src={fileName} title={fileName}></img>
                </Match>
            </Switch>
        </button>
    );
}