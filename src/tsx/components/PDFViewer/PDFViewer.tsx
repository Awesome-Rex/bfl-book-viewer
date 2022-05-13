import React, { CSSProperties, ForwardedRef, forwardRef, LegacyRef, MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import handleRef from 'src/tsx/hooks/handleRef';
import useResizeObserver from 'src/tsx/hooks/useResizeObserver';

import {Document, Page, pdfjs} from "react-pdf/dist/esm/entry.webpack";
//import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import "./pdf-viewer.scss";

// import {Document, Page, pdfjs} from "react-pdf";
// import pdfjsLib from 'public/vendors/pdfjs-dist/web/viewer';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = forwardRef(({
    src, 
    doubleSided = false, 
    setTotalPages,

    currentPages = [1, 2], 

    className,
    style
}: {
    src: string, 
    doubleSided: boolean, 
    setTotalPages?: Function

    currentPages: number[], 

    className?: string,
    style?: CSSProperties

}, ref: ForwardedRef<HTMLDivElement>) => {
    // source
    const source = src;
    
    // refs
    const viewerRef = useRef<HTMLDivElement>(undefined!);
    const containerRef = useRef<HTMLDivElement>(undefined!);
    const dimensionRef = useRef<HTMLDivElement>(undefined!);
    const documentRef = useRef<HTMLDivElement>(undefined!);
    const pageRefs = useRef<(HTMLDivElement | null)[]>(undefined!);
    useEffect(() => {
        pageRefs.current = [undefined!]
        if (!doubleSided) pageRefs.current = [undefined!];
        if (doubleSided) pageRefs.current = [undefined!, undefined!];
    }, [source]);

    // book info
    const [[pxWidth, pxHeight], setPxSize] = useState<[number | undefined, number | undefined]>([undefined, undefined]);
    const resetPxSize = useCallback(() => {
        let calcWidth: number | undefined = containerRef.current?.clientWidth;
        let calcHeight: number | undefined = containerRef.current?.clientHeight;
        
        let definedWidth: boolean = 
            viewerRef.current.style.width != "" ||
            viewerRef.current.style.minWidth != "" ||
            viewerRef.current.style.maxWidth != "";
        let definedHeight: boolean = 
            viewerRef.current.style.height != "" ||
            viewerRef.current.style.minHeight != "" ||
            viewerRef.current.style.maxHeight != "";

        if (definedWidth && definedHeight) {
            if (calcWidth < calcHeight) setPxSize([calcWidth, undefined]);
            if (calcHeight < calcWidth) setPxSize([undefined, calcHeight]);
        }
        else if (!definedWidth && !definedHeight) {
            setPxSize([undefined, undefined]);
        }
        else if (definedWidth && !definedHeight) {
            setPxSize([calcWidth, undefined]);
        }
        else if (definedHeight && !definedWidth) {
            setPxSize([undefined, calcHeight]);
        }
    }, []);
    useLayoutEffect(() => resetPxSize(), []);
    useResizeObserver(viewerRef.current, (entries, observer) => resetPxSize());
    
    // onload function
    const load = ({numPages}: pdfjs.PDFDocumentProxy) => {
        if (setTotalPages != undefined) setTotalPages(numPages); // set total pages
    }

    return (
        <div
            className={`_pdf-viewer ${className ?? ""}`}
            style={style}
            ref={viewerRef}
        >
            <div 
                className={`_container`}
                ref={containerRef}
            >
                <div 
                    className={`dimensions`} 
                    ref={dimensionRef} 
                >
                    <Document 
                        file={source} 
                        onLoadSuccess={load} 
                        className={`_document _view`}
                        inputRef={handleRef([documentRef], ref)}
                    >
                        {!doubleSided ? ( 
                            <> {/* single page per view */}
                                <Page pageNumber={currentPages[0]} inputRef={(node) => pageRefs.current[0] = node} className={`_page`} width={pxWidth} height={pxHeight}/>
                            </>
                        ) : (
                            <> {/* double page per view */}
                                <Page pageNumber={currentPages[0]} inputRef={(node) => pageRefs.current[0] = node} className={`_page`} width={pxWidth ? pxWidth * 0.5 : undefined} height={pxHeight}/>
                                <Page pageNumber={currentPages[1]} inputRef={(node) => pageRefs.current[1] = node} className={`_page`} width={pxWidth ? pxWidth * 0.5 : undefined} height={pxHeight}/>
                            </>
                        )}
                    </Document>
                </div>
            </div>
        </div>
    );
});

export default PDFViewer;
