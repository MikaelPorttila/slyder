import type { Presentation, Slide } from '../types';
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export type PresentationContext = [
    Presentation, 
    {
        setLoading: (value: boolean) => void;
        setPresentation: (presentation: Presentation) => void;
        setCurrentSlide: (slide: Slide) => void;
        next: () => void;
        back: () => void;
        jumpTo: (position: number) => void
    }
];

const Context = createContext<PresentationContext>();

export function PresentationContextProvider(props) {
    const [state, setState] = createStore({
        presentationId: props.presentationId || (new Date).getTime(),
        loading: props.loading || false,
        name: props.name || 'Untitled',
        slides: props.slides || [],
        length: props.slides?.length || 0,
        startTime: props.startTime || new Date(),
        currentSlide: props.slides?.[0] || null,
        timeline: props.timeline || {
            position: 0,
            length: 0,
            entries: []
        }
    } as Presentation);

    const goToTimeEntry = (position: number): void => {
        if (!state.timeline.length) {
            return;
        }

        const lastPosition = state.timeline.length - 1;
        if (position > lastPosition) {
            position = lastPosition;
        }
        else if(position < 0) {
            position = 0;
        }

        const currentSlideId = state.timeline.entries[position].slideId;
        setState({
            timeline: { ...state.timeline, position },
            currentSlide: {...state.slides.find(slide => slide.fileName === currentSlideId)}
        });
    }

    const store: any = [
        state, 
        {
            setLoading(value: boolean) {
                setState("loading", () => value);
            },
            setPresentation(presentation: Presentation) {
                setState({
                    name: presentation.name,
                    slides: presentation.slides,
                    length: presentation.slides?.length || 0,
                    loading: false,
                    timeline: presentation.timeline
                });
            },
            setCurrentSlide: (slide: Slide) => goToTimeEntry(state.timeline.entries.findIndex(entry => entry.slideId === slide.fileName)),
            next: () => goToTimeEntry(state.timeline.position + 1),
            back: () => goToTimeEntry(state.timeline.position - 1),
            jumpTo: (position: number) => goToTimeEntry(position)
        }
    ];

    return (
        <Context.Provider value={store}>
            {props.children}
        </Context.Provider>
    );
}

export const getPresentationContext = () => useContext(Context);