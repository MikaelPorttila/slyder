import { Component, Switch, Match } from "solid-js"
import type { Slide as SlideEntry } from './../types';
import styles from "./Slide.module.css";

interface SlideProps {
    slide: SlideEntry
}

export const Slide: Component<SlideProps> = (props) => {
    const { fileName, type } = props.slide;
    return (
        <div class={styles.Slide}>
            <Switch fallback={<>{ fileName }</>}>
                <Match when={ type.startsWith('image/') }>
                    <img src={fileName} title={fileName}></img>
                </Match>
            </Switch>
        </div>
    );
}