import type { Slide } from './slide';

export interface Presentation {
    name: string;
    loading: boolean;
    slides: Slide[];
    length: number;
    startTime: Date;
    currentSlide: Slide;
}