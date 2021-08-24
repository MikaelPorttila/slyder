import type { Slide } from "../types";
import type { Timeline, TimelineEntry } from "../types/timeline";

export const mapTimeline = (slides: Slide[]): Timeline => {
    const entries: TimelineEntry[] = slides?.map((slide: Slide) => ({
            position: 0,
            slideId: slide.fileName,
            length: 1
        } as TimelineEntry)) || [];

    return {
        position: 0,
        entries,
        length: entries.length
    } as Timeline;
}