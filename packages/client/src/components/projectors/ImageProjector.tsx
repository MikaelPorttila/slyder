import type { Component } from "solid-js";
import type { SlideProps } from "../types/slide-props";
import styles from "./ImageProjector.module.css";

export const ImageProjector: Component<SlideProps> = ({ slide }) => {
    return (
        <img 
            class={styles.imageProjector}
            src={slide.fileName} 
            title={slide.fileName}
        ></img>    
    );
}