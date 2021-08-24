import { Component, onMount } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./MarkdownProjector.module.css";
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

export const MarkdownProjector: Component<SlideProps> = (props) => {
    let markdownProjector: HTMLDivElement;
    onMount(() => {
        markdownProjector
            .querySelectorAll('code')
            .forEach(hljs.highlightElement);
    });

    return (
        <div ref={markdownProjector} class={styles.markdownProjector}>
            <div innerHTML={marked(props.slide.data)}></div>
        </div>   
    );
}