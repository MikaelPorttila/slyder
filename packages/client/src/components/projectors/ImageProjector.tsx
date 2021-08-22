import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./ImageProjector.module.css";

export const ImageProjector: Component<SlideProps> = (props) => {
    return (
        <img 
            class={styles.ImageProjector}
            src={props.slide.fileName} 
            title={props.slide.fileName}
        ></img>    
    );
}