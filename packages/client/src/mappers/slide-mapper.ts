import type { Slide } from "../types";

export const mapSlide = (data): Slide => {
    const result = data as Slide;
    result.supported = [
        'image/',
        'video/',
        'audio/'
    ].some(type => result.type.startsWith(type));      
    return result;
}