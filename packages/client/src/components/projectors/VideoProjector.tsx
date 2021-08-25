import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./VideoProjector.module.css";

export const VideoProjector: Component<SlideProps> = (props) => {
    return (
        <video controls width="100%" height="100%" class={styles.VideoProjector}>
            <source
                src={props.slide.fileName + `?instance=${props.presentationId}`}
                type={props.slide.type}
            ></source>
        </video> 
    );
}