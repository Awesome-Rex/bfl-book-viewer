import React, { useContext, useEffect, useRef, useState } from "react";
import { PageCollection, PageOffset } from "src/ts/models/BookSource";
import useForceUpdate from "src/tsx/hooks/Utility/useForceUpdate";
import { BookPlayerContext } from "./BookPlayer";

export default function PageEntry({
    index
}: {
    index: number
}) {
    // context
    const context = useContext(BookPlayerContext);

    //const forceUpdate = useForceUpdate();

    //useEffect(() => forceUpdate(), [context.input.entryCurrentPages]);

    // ref
    const pageEntryRef = useRef<HTMLInputElement>(null!);

    // state
    const [focus, setFocus] = useState<boolean>(false);

    // effects
    useEffect(() => {
        pageEntryRef.current.value = context.input.currentPages[index].toString();
    }, [context.input.currentPages]);

    // functions
    const enterPage = (page: number) => {
		context.setProgress(progress => {
			progress.setCurrentPage(page);
			return progress;
		});
	}

	return (
        <input 
            ref={pageEntryRef}
            className={`page entry ${!context.progress.source.pageIncluded(context.input.currentPages[index], PageCollection.Defined) && "-excluded"}`} 
            type="number"
            
            defaultValue={context.progress.currentPages[index]}
            min={context.progress.source.getPageRange(PageCollection.Full, PageOffset.Offset).min}
            max={context.progress.source.getPageRange(PageCollection.Full, PageOffset.Offset).max}
            
            onInput={e => context.input.setEntryCurrentPages(context.progress.source.viewToPages(context.progress.source.pageToView(parseInt((e.target as HTMLInputElement).value))))}
            
            onFocus={e => setFocus(true)}
            onKeyUp={e => e.key === "Enter" && enterPage(parseInt((e.target as HTMLInputElement).value))}
            onBlur={e => {
                enterPage(parseInt((e.target as HTMLInputElement).value))
                setFocus(false);
            }}
        />
    );
}
