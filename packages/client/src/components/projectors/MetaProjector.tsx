import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./MetaProjector.module.css";

export const MetaProjector: Component<SlideProps> = ({ slide }) => {
    return (
        <div class={styles.metaProjector}>
            <div>
                <h1>{slide.fileName}</h1>
                <ul>
                    <li>
                        Type: {slide.type}
                    </li>
                </ul>
            </div>
        </div>   
    );
}