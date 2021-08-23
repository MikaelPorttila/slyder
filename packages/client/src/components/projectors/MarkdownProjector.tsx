import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./MarkdownProjector.module.css";

export const MarkdownProjector: Component<SlideProps> = ({ slide }) => {
    return (
        <div class={styles.markdownProjector}>
            <h1>{slide.fileName}</h1>
            <ul>
                <li>
                    Type: {slide.type}
                </li>
                <li>
                    Data: {slide.data}
                </li>
            </ul>
        </div>   
    );
}