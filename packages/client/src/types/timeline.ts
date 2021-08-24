export interface Timeline {
    entries: TimelineEntry[];
    position: number;
    length: number;
}

export interface TimelineEntry {
    slideId: string;
    position: number;
    length: number;
}