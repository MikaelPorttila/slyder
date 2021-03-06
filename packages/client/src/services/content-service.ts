import type { Presentation, Commands } from './../types';
import { mapSlide } from '../mappers/slide-mapper';
import { mapTimeline } from '../mappers/timeline-mapper';
import { ApiPath } from '@slyder/common';

export const getInitalData = async (): Promise<[Presentation, Commands]> => {
    const data: {files: [], commands: Commands} = await fetch(ApiPath).then(x => x.json());
    const slides = data.files.map(slide => mapSlide(slide)); 
    const timeline = mapTimeline(slides);

    const result = {
        name: 'test',
        loading: false,
        length: slides.length,
        slides,
        timeline
    } as Presentation

    return [result, data.commands];
}