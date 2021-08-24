import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./ImageProjector.module.css";

export const ImageProjector: Component<SlideProps> = (props) => {
    return (
        <img 
            class={styles.imageProjector}
            src={props.slide.fileName + `?instance=${props.presentationId}`} 
            title={props.slide.fileName}
        ></img>    
    );
}