import type { Component } from "solid-js";
import { getPresentationContext } from '../context/presentation';

export const Projector: Component = () => {
    const [state, {}] = getPresentationContext();
    return (
        <div class="projector">
            current Slide: {state.currentSlide?.fileName}
        </div>
    )
}