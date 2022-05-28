import React, { CSSProperties, ForwardedRef, forwardRef, LegacyRef, MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import handleRef from 'src/tsx/hooks/handleRef';
import useRefResizeObserver from 'src/tsx/hooks/useRefResizeObserver';

import {Document, Page, pdfjs} from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/esm/Page/TextLayer';
// import {Document, Page, pdfjs} from "react-pdf";
// import pdfjsLib from 'public/vendors/pdfjs-dist/web/viewer';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import styles from "./pdf-viewer.module.scss";
import useSelectorResizeObserver from 'src/tsx/hooks/useSelectorResizeObserver';
//import "./pdf-viewer.scss";

const PDFViewer = forwardRef(({
    src, 
    doubleSided = false, 
    halfFirst = false,
    halfLast = false,
    setTotalPages,

    currentPages = [1, 2], 

    renderAnnotationLayer = false,
    renderTextLayer = false,

    firstFiller,
    lastFiller,

    className,
    style
}: {
    src: string, 
    doubleSided: boolean, 
    halfFirst?: boolean,
    halfLast?: boolean,
    setTotalPages?: Function,

    currentPages: number[], 

    renderAnnotationLayer?: boolean,
    renderTextLayer?: boolean,

    firstFiller?: React.ReactNode,
    lastFiller?: React.ReactNode,

    className?: string,
    style?: CSSProperties

}, ref: ForwardedRef<HTMLDivElement>) => { //+++++++++++++++++ useEffect on array prop will always activate (solved with ...)
    // source
    const source = src;
    useEffect(() => {
        setPxSize([0, 0]);
        setPxPageSize([0, 0]);
    }, [source]);
    
    // refs
    const viewerRef = useRef<HTMLDivElement>(undefined!);
    const containerRef = useRef<HTMLDivElement>(undefined!);
    const dimensionRef = useRef<HTMLDivElement>(undefined!);
    const documentRef = useRef<HTMLDivElement>(undefined!);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([null]);
    useEffect(() => {
        if (!doubleSided) pageRefs.current = [null];
        if (doubleSided) pageRefs.current = [null, null];
    }, [source, doubleSided]);
    const pageCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([null]);
    useEffect(() => {
        if (!doubleSided) pageCanvasRefs.current = [null];
        if (doubleSided) pageCanvasRefs.current = [null, null];
    }, [source, doubleSided]);

    // book info
    const totalPages = useRef<number>(0);

    // page turn info
    const [first, setFirst] = useState<boolean>(false);
    const [last, setLast] = useState<boolean>(false);
    const [half, setHalf] = useState<boolean>(false);
    useEffect(() => {
        const first = currentPages.includes(1);
        const last = currentPages.includes(totalPages.current);

        setFirst(first);
        setLast(last);
        setHalf((first && halfFirst) || (last && halfLast));
    }, [JSON.stringify(currentPages), totalPages.current, doubleSided, source]);

    // layout info
    const [[pxWidth, pxHeight], setPxSize] = useState<[number | undefined, number | undefined]>([undefined, undefined]);
    const resetPxSize = useCallback(() => {
        // computed style
        const computedStyle = window.getComputedStyle(viewerRef.current);

        // calculated viewer ref size
        const calcWidth: number | undefined = containerRef.current?.clientWidth;
        const calcHeight: number | undefined = containerRef.current?.clientHeight;
        
        // whether or not viewer ref width and height are defined
        const definedWidth: boolean = (
            viewerRef.current.style.width != "" ||
            computedStyle.minWidth != "0px" ||
            computedStyle.maxWidth != "none"
        );
        const definedHeight: boolean = (
            viewerRef.current.style.height != "" ||
            computedStyle.minHeight != "0px" ||
            computedStyle.maxHeight != "none"
        );

        // set boundary size
        // ***ONLY 1 DIMENSION CAN BE DEFINED AT A TIME (width and height cannot have defined values at the same time)
        if (definedWidth && definedHeight) {
            if (calcWidth < calcHeight)             setPxSize([calcWidth, undefined]);
            if (calcHeight < calcWidth)             setPxSize([undefined, calcHeight]);
        }
        else if (!definedWidth && !definedHeight)   setPxSize([undefined, undefined]);
        else if (definedWidth && !definedHeight)    setPxSize([calcWidth, undefined]);
        else if (definedHeight && !definedWidth)    setPxSize([undefined, calcHeight]);
    }, [viewerRef.current, containerRef.current]);
    useLayoutEffect(() => resetPxSize(), [viewerRef, JSON.stringify(currentPages), pageRefs, source]);
    useRefResizeObserver(viewerRef.current, (entries, observer) => resetPxSize());
    
    const [[pxPageWidth, pxPageHeight], setPxPageSize] = useState<[number, number]>([0, 0]);
    useEffect(() => {
        if (
            (pxHeight != undefined && 
                (
                    (pxPageHeight != pxHeight)
                )
            ) || 
            (pxWidth != undefined && 
                (
                    (!doubleSided && !half && pxPageWidth != pxWidth) || 
                    (!doubleSided && half && pxPageWidth != pxWidth * 0.5) ||
                    (doubleSided && !half && pxPageWidth != pxWidth * 0.5) ||
                    (doubleSided && half && pxPageWidth != pxWidth * 0.5)
                )
            )
        ) {
            const pageCanvasRef = pageCanvasRefs.current.find(ref => ref != undefined);
            if (pageCanvasRef != undefined) setPxPageSize([pageCanvasRef.clientWidth, pageCanvasRef.clientHeight]);
        }
    }, [pxWidth, pxHeight, doubleSided, half, JSON.stringify(pageCanvasRefs.current.map(ref => [ref?.clientWidth, ref?.clientHeight]))]);

    // onload function
    const load = (doc: pdfjs.PDFDocumentProxy) => {
        const {numPages} = doc;

        if (setTotalPages != undefined) {
            setTotalPages(numPages); // set total pages
            totalPages.current = numPages;
        }
    }

    const pageClamp = (page: number) => {
        if (page < 1) return 1;
        if (page > totalPages.current && totalPages.current > 0) return totalPages.current;
        
        return page;
    };

    return (
        <div
            className={`${styles.viewer} ${className}`}
            style={style}
            ref={viewerRef}
        >
            <div 
                className={styles.container}
                ref={containerRef}
            >
                <div 
                    className={styles.dimensions} 
                    ref={dimensionRef} 
                >
                    <Document 
                        file={source} 
                        onLoadSuccess={load} 
                        className={`${styles.document} ${styles.view}`}
                        inputRef={handleRef([documentRef], ref)}
                    >
                        {!doubleSided ? ( 
                            <> {/* single page per view */}
                                {half && first && <div 
                                    className={styles.filler} 
                                    style={{
                                        width: pxPageWidth,
                                        height: pxPageHeight
                                    }}
                                >{firstFiller}</div>}
                                <Page 
                                    renderAnnotationLayer={renderAnnotationLayer} 
                                    renderTextLayer={renderTextLayer}
                                    pageNumber={pageClamp(currentPages[0])} 
                                    inputRef={node => pageRefs.current[0] = node} 
                                    canvasRef={node => pageCanvasRefs.current[0] = node}
                                    className={styles.page} 
                                    width={!pxWidth ? undefined : !half ? pxWidth : pxWidth * 0.5} 
                                    height={!pxHeight ? undefined : pxHeight}
                                />
                                {half && last && <div 
                                    className={styles.filler} 
                                    style={{
                                        width: pxPageWidth,
                                        height: pxPageHeight
                                    }}
                                >{lastFiller}</div>}
                            </>
                        ) : (
                            <> {/* double page per view */}
                                {!(half && first) ? (<Page 
                                    renderAnnotationLayer={renderAnnotationLayer} 
                                    renderTextLayer={renderTextLayer}
                                    pageNumber={pageClamp(currentPages[0])} 
                                    inputRef={node => pageRefs.current[0] = node} 
                                    canvasRef={node => pageCanvasRefs.current[0] = node}
                                    className={styles.page} 
                                    width={!pxWidth ? undefined : pxWidth * 0.5} 
                                    height={pxHeight}
                                />) : (<div 
                                    className={styles.filler} 
                                    style={{
                                        width: pxPageWidth,
                                        height: pxPageHeight
                                    }}
                                >{firstFiller}</div>)}
                                {!(half && last) ? (<Page 
                                    renderAnnotationLayer={renderAnnotationLayer} 
                                    renderTextLayer={renderTextLayer}
                                    pageNumber={pageClamp(currentPages[1])} 
                                    inputRef={node => pageRefs.current[1] = node} 
                                    canvasRef={node => pageCanvasRefs.current[1] = node}
                                    className={styles.page} 
                                    width={!pxWidth ? undefined : pxWidth * 0.5}
                                    height={pxHeight}
                                />) : (<div 
                                    className={styles.filler} 
                                    style={{
                                        width: pxPageWidth,
                                        height: pxPageHeight
                                    }}
                                >{lastFiller}</div>)}
                            </>
                        )}
                    </Document>
                </div>
            </div>
        </div>
    );
});

export default PDFViewer;
