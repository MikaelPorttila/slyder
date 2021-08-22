import type { Presentation, Slide } from '../types';
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export type PresentationContext = [
    Presentation, 
    {
        setLoading: (value: boolean) => void;
        setSlides: (slides: Slide[]) => void;
        setPresentation: (presentation: Presentation) => void;
        setCurrentSlide: (slide: Slide) => void;
    }
];

const Context = createContext<PresentationContext>();

export function PresentationContextProvider(props) {
    const [state, setState] = createStore({
        loading: props.loading || false,
        name: props.name || 'Untitled',
        slides: props.slides || [],
        length: props.slides?.length || 0,
        startTime: props.startTime || new Date(),
        currentSlide: props.slides?.[0] || null
    });

    const store: any = [
        state, 
        {
            setLoading(value: boolean) {
                setState("loading", () => value);
            },
            setSlides(slides: Slide[]) {
                setState("slides", () => slides);
                setState("length", () => slides?.length || 0);
            },
            setPresentation(presentation: Presentation) {
                setState("name", () => presentation.name);
                setState("slides", () => presentation.slides);
                setState("length", () => presentation.slides?.length || 0);
                setState("loading", () => false);
            },
            setCurrentSlide(slide: Slide) {
                setState("currentSlide", () => slide);
            }
        }
    ];

    return (
        <Context.Provider value={store}>
            {props.children}
        </Context.Provider>
    );
}

export const getPresentationContext = () => useContext(Context);