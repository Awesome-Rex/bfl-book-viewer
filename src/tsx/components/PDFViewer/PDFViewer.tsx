import React, { ForwardedRef, forwardRef, MutableRefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {Document, Page, pdfjs} from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer";

// import {Document, Page, pdfjs} from "react-pdf";
//import pdfjsLib from 'public/vendors/pdfjs-dist/web/viewer';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = forwardRef(({
    src, 
    currentPage = 1, 
    doubleSided = false, 
    setTotalPages,
    width,
    height,
    className,
    classNamePage
}: {
    src: string, 
    currentPage: number | number[], 
    doubleSided: boolean, 
    setTotalPages?: Function
    width?: number | string
    height?: number | string,
    className?: string,
    classNamePage?: string
}, ref: ForwardedRef<HTMLDivElement>) => {
    const source = useMemo<string>(() => src, [src]);
    const [[numWidth, numHeight], setNumSize] = useState<(number | undefined)[]>([0,0]);

    const dimensionRef = useRef<HTMLDivElement>(null!);
    const pageRefs = useRef<React.MutableRefObject<HTMLDivElement>[]>([]);
    const documentRef = useRef<HTMLDivElement>();

    useEffect(() => { //********************doesnt work
        if (!doubleSided) pageRefs.current = [undefined!];
        if (doubleSided) pageRefs.current = [undefined!, undefined!]
        console.log("helo");
    }, [source]);

    const load = ({totalPages}: any) => {
        if (setTotalPages != undefined) setTotalPages(totalPages);
        
        if (documentRef.current) {
            documentRef.current.style.display = "flex";
            documentRef.current.style.flexWrap = "nowrap";
        }

        if (pageRefs.current.every(page => page != undefined)) { //***************DOESNT WORK
            pageRefs.current.forEach((page, index, collection) => {
                console.log("hi");
                page.current.style.flexBasis = "0";
                page.current.style.flexShrink = "1";
                page.current.style.flexGrow = "1";
            });
        }

        setNumSize([dimensionRef.current?.clientWidth, dimensionRef.current?.clientHeight]);
    }

    return (
        <>
            <Document file={source} onLoadSuccess={load} className={className} inputRef={(node) => { //+++++++++++++++++++++TO BE REPLACED BY HOOK (setRefs(ref?, [refs?]))
                documentRef.current = node!;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    (ref as MutableRefObject<HTMLDivElement>).current = node!;
                }
            }}>
                {!doubleSided ? ( 
                    <>
                        <Page pageNumber={currentPage as number} inputRef={pageRefs.current[0]} className={classNamePage} width={numWidth} height={numHeight}/>
                    </>
                ) : (
                    <>
                        <Page pageNumber={(currentPage as number[])[0]} inputRef={pageRefs.current[0]} className={classNamePage} width={numWidth ? numWidth * 0.5 : undefined} height={numHeight}/>
                        <Page pageNumber={(currentPage as number[])[1]} inputRef={pageRefs.current[0]} className={classNamePage} width={numWidth ? numWidth * 0.5 : undefined} height={numHeight}/>
                    </>
                )}
            </Document>
            <div className="dimensions" ref={dimensionRef} style={{
                width: width,
                height: height,
                position: "absolute",
                visibility: "hidden",
                pointerEvents: "none"
                // display: "none"
            }}></div>
        </>
    );
})

export default PDFViewer;

// export default function PDFViewer({src}/*: {src: string}*/) {
//     const [doc, setDoc] = useState(null);

//     const [loaded, setLoaded] = useState<boolean>(false);
//     const [pageLoaded, setPageLoaded] = useState<boolean>(false);
//     const currentPage = useState<number>(1);

//     const [scale, setScale] = useState<number>(1.5);
//     const canvas = useRef<HTMLCanvasElement>(null);
//     const ctx = useMemo(() => canvas.current?.getContext("2d"), [canvas]);

//     function renderPage (page/*: number*/) {

//     }

//     pdfjsLib.getDocument(src).promise.then(doc_ => {
//         setDoc(doc_)
//     });

//     return (
//         <canvas ref={canvas} className="_PDF-VIEWER"></canvas>
//     );
// }
