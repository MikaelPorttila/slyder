import type { Slide } from '@slyder/common';
import { MimeGroup, Mime, FileExtension } from "../constants";

// External parsers
import marked from 'marked';
import hljs from 'highlight.js';
import { parse as parseIni } from 'ini';

export const mapSlide = (data): Slide => {
    const result = data as Slide;
    result.supported = [
        MimeGroup.Image,
        MimeGroup.Video,
        MimeGroup.Audio
    ].some(type => result.type.startsWith(type));
    
    if (result.data) {
        const transformationPipeline = [];

        switch(result.type) {
            case Mime.Markdown:
                transformationPipeline.push(marked);
                transformationPipeline.push(codeHighlightTransformation);
            break;
        }

        if (result.fileExtension.endsWith(FileExtension.Url)) {
            transformationPipeline.push(urlFileTransformation);
        }

        if (transformationPipeline.length > 0) {
            result.data = transformationPipeline
                .reduce((res, transformation) => transformation(res), result.data);
        }
    }

    return result;
}

/*
    Custom Transformations 
*/
const codeHighlightTransformation = (data: string) => {
    const vDom = document.createElement('div');
    vDom.innerHTML = data;
    vDom
        .querySelectorAll('code')
        .forEach(hljs.highlightElement);
    return vDom.innerHTML;
};

const urlFileTransformation = (data: string): string => {
    const urlMetadata = parseIni(data);
    let result = data;

    const internetShortcut = urlMetadata["InternetShortcut"];

    if (internetShortcut?.URL) {
        result = internetShortcut.URL;
    }

    return result;
}