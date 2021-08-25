import type { Presentation } from './../types/presentation';
import { mapSlide } from '../mappers/slide-mapper';
import { mapTimeline } from '../mappers/timeline-mapper';

export const getPresentation = async (): Promise<Presentation> => {
    const data: [] = await fetch('/api/data').then(x => x.json());
    const slides = data.map(slide => mapSlide(slide)); 
    const timeline = mapTimeline(slides);

    const result = {
        name: 'test',
        loading: false,
        length: slides.length,
        slides,
        timeline
    } as Presentation

    return result;
}