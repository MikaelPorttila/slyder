import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./MarkdownProjector.module.css";
import marked from 'marked';

export const MarkdownProjector: Component<SlideProps> = (props) => {
    return (
        <div class={styles.markdownProjector}>
            <div innerHTML={marked(props.slide.data)}></div>
        </div>   
    );
}