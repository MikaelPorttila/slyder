import { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./HtmlProjector.module.css";
import 'highlight.js/styles/monokai-sublime.css';

export const HtmlProjector: Component<SlideProps> = (props) => {
    return (
        <div class={styles.htmlProjector}>
            <div innerHTML={props.slide.data}></div>
        </div>   
    );
}