import type { Slide } from "../types";
import marked from 'marked';
import hljs from 'highlight.js';

export const mapSlide = (data): Slide => {
    const result = data as Slide;
    result.supported = [
        'image/',
        'video/',
        'audio/'
    ].some(type => result.type.startsWith(type));
    
    if (result.data) {
        const transformationPipeline = [];
        switch(result.type) {
            case 'text/markdown':
                transformationPipeline.push(marked);
                transformationPipeline.push(codeHighlightTransformation);
            break;
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

const codeHighlightTransformation = (rawHtmlString: string) => {
    const vDom = document.createElement('div');
    vDom.innerHTML = rawHtmlString;
    vDom
        .querySelectorAll('code')
        .forEach(hljs.highlightElement);
    return vDom.innerHTML;
};