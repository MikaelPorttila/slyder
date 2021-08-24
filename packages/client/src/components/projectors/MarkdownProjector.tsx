import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./MarkdownProjector.module.css";

export const MarkdownProjector: Component<SlideProps> = (props) => {
    return (
        <div class={styles.markdownProjector}>
            <h1>{props.slide.fileName}</h1>
            <ul>
                <li>
                    Type: {props.slide.type}
                </li>
                <li>
                    Data: {props.slide.data}
                </li>
            </ul>
        </div>   
    );
}