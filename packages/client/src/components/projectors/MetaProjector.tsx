import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./MetaProjector.module.css";

export const MetaProjector: Component<SlideProps> = (props) => {
    return (
        <div class={styles.metaProjector}>
            <div>
                <h1>{props.slide.fileName}</h1>
                <ul>
                    <li>
                        Type: {props.slide.type}
                    </li>
                </ul>
            </div>
        </div>   
    );
}