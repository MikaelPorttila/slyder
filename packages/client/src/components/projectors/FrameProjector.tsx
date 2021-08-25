import { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./FrameProjector.module.css";
import 'highlight.js/styles/monokai-sublime.css';

export const FrameProjector: Component<SlideProps> = (props) => {
    return (
        <div class={styles.frameProjector}>
            <a
                href={props.slide.data}
                target="_blank"
            >
                {props.slide.data}
            </a>
        </div>   
    );
}