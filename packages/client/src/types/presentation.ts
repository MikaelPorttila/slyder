import type { Slide } from '@slyder/common';
import type { Timeline } from './timeline';

export interface Presentation {
    presentationId: number;
    name: string;
    loading: boolean;
    slides: Slide[];
    timeline: Timeline;
    length: number;
    startTime: Date;
    currentSlide: Slide;
}