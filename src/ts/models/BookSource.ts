import romanize from "../helpers/romanize";
import PageRange from "./PageRange";
// import { PageTrack } from "./PageTrack";
// import ViewTrack from "./ViewTrack";

export enum PageLayout {Half = 0.5, Double = 2, Single = 1}
export enum PageSide {Left, Right, Center, Both}
export enum PageOffset {Offset, Start}
export enum PageCollection {Defined, Source, Full, Raw}
//  defined = pages from source excluded    (< source)
//  source = total pages from source        (= source)
//  full = pages from source included       (> source)

export default abstract class BookSource {
    static outputPage(page: number): string {
        if (page >= 1) {
            return page.toString();
        } else if (page < 1 || true) {
            return romanize((page * -1) + 1);
        }
    }

    // //PAGE MANAGEMENT (USING FIRSTEXCLUDE AND LASTEXCLUDE)
    //     //total pages (including excludes)
    //     //pages (excluding excludes)

    public abstract readonly link: string;

    public abstract readonly pageLayout: PageLayout;
    public abstract readonly totalPagesRaw: number;

    //page counting, page range
    public readonly pageOffset = 0;             // [all]    //shift towards page 1 (according to source range)
    public readonly firstExclude: number = 0;   // [all]    //excluded pages left (according to source range)
    public readonly lastExclude: number = 0;    // [all]    //excluded pages right (according to source range)
    public readonly oddFirst: boolean = false;  // [half]   //whether or not first view contains 1 page
    public readonly oddLast: boolean = false;   // [half]   //whether or not last view contains 1 page



    public getTotalPages (range: PageCollection): number {
        if (range == PageCollection.Defined) {
            if (this.pageLayout == PageLayout.Single) return this.totalPagesRaw - this.firstExclude - this.lastExclude;
            if (this.pageLayout == PageLayout.Double) return this.totalPagesRaw * 2 - this.firstExclude - this.lastExclude;
            if (this.pageLayout == PageLayout.Half) return this.totalPagesRaw - this.firstExclude - this.lastExclude;
        }
        if (range == PageCollection.Source) {
            if (this.pageLayout == PageLayout.Single) return this.totalPagesRaw;
            if (this.pageLayout == PageLayout.Double) return this.totalPagesRaw * 2;
            if (this.pageLayout == PageLayout.Half) return this.totalPagesRaw;
        }
        if (range == PageCollection.Full) {
            if (this.pageLayout == PageLayout.Single) return this.totalPagesRaw;
            if (this.pageLayout == PageLayout.Double) return this.totalPagesRaw * 2;
            if (this.pageLayout == PageLayout.Half) return this.totalPagesRaw + 
                (this.oddFirst ? 1 : 0) + 
                (this.oddLast ? 1 : 0);
        }
        if (range == PageCollection.Raw) return this.totalPagesRaw;
        return undefined!;
    }
    public getTotalViews(): number {
        if (this.pageLayout == PageLayout.Single) return this.getTotalPages(PageCollection.Full);
        if (this.pageLayout == PageLayout.Double) return this.getTotalPages(PageCollection.Full);
        if (this.pageLayout == PageLayout.Half) return this.getTotalPages(PageCollection.Full) / 2;
        return undefined!; 
    }
    public getPageRange(range: PageCollection, includeOffset: PageOffset): PageRange {
        if (includeOffset == PageOffset.Offset) { 
            if (range == PageCollection.Defined) return new PageRange(
                +1 - this.pageOffset + this.firstExclude, 
                -1 - this.pageOffset + this.getTotalPages(PageCollection.Defined)
            );
            if (range == PageCollection.Source) return new PageRange(
                +1 - this.pageOffset, 
                -1 - this.pageOffset + this.getTotalPages(PageCollection.Source)
            );
            if (range == PageCollection.Full) return new PageRange(
                +1 - this.pageOffset - (this.pageLayout == PageLayout.Half && this.oddFirst ? 1 : 0), 
                -1 - this.pageOffset + this.getTotalPages(PageCollection.Full)
            );
        }
        if (includeOffset == PageOffset.Start) {
            if (range == PageCollection.Defined) return new PageRange(1, this.getTotalPages(PageCollection.Defined));
            if (range == PageCollection.Source) return new PageRange(1, this.getTotalPages(PageCollection.Source));
            if (range == PageCollection.Full) return new PageRange(1, this.getTotalPages(PageCollection.Full));
        }
        if (range == PageCollection.Raw) return new PageRange(1, this.totalPagesRaw);
        return undefined!;
    }
    public getViewRange() {
        return new PageRange(1, this.getTotalViews());
    }
    public pageIncluded(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): boolean {
        return this.getPageRange(range, includeOffset).between(page);
    }
    public viewExcluded(view: number) {
        return this.getViewRange().between(view);
    }

    public getPageProgress(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number {
        return this.getPageRange(range, includeOffset).lerp(page);
    }
    public getViewProgress(view: number) {
        return this.getViewRange().lerp(view);
    }

    //private conversion methods (methods exclude PageCollection.Raw)
    protected startToOffset(page: number = 1, range: Omit<PageCollection.Defined, "Raw"> = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number { //page to global offset (to PageOffset.Offset)
        if (includeOffset == PageOffset.Offset) return page;
        else if (includeOffset == PageOffset.Start) return page + this.getPageRange(<PageCollection>range, PageOffset.Offset).min - 1;
        return undefined!;
    }
    protected offsetToStart(page: number = 1, range: Omit<PageCollection.Defined, "Raw"> = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number { //global offset to page (from PageOffset.Offset)
        if (includeOffset == PageOffset.Offset) return page;
        else if (includeOffset == PageOffset.Start) return page - this.getPageRange(<PageCollection>range, PageOffset.Offset).min + 1;
        return undefined!;
    }
    
    //public conversion methods
    public pageToSide(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): PageSide {
        if (this.pageLayout == PageLayout.Single) return PageSide.Center;
        if (this.pageLayout == PageLayout.Double) {
            if (range == PageCollection.Raw) return PageSide.Both;
            else {
                let lean: number = this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start) % 2;
                if (lean == 1) return PageSide.Left;
                if (lean == 0) return PageSide.Right;
            }
        }
        if (this.pageLayout == PageLayout.Half) {
            // let absolute: number = this.pageToPage(page, range, includeOffset, PageCollection.Source, PageOffset.Start);
            // if (
            //     (absolute == 1 && this.oddFirst) ||
            //     (absolute == this.getTotalPages(PageCollection.Source) && this.oddLast)
            // ) return PageSide.Center;
            // else {
                let lean: number = this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start) % 2;
                if (lean == 1) return PageSide.Left;
                if (lean == 0) return PageSide.Right;
            //}
        }
        return undefined!;
    }
    public pageToPage(
        page: number = 1, 
        rangeA: PageCollection = PageCollection.Defined, includeOffsetA: PageOffset = PageOffset.Offset, 
        rangeB: PageCollection = PageCollection.Defined, includeOffsetB: PageOffset = PageOffset.Offset
    ): number {
        return this.offsetToStart(this.startToOffset(page, rangeA, includeOffsetA), rangeB, includeOffsetB);
    }
    public pageToRaw(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number {
        if (this.pageLayout == PageLayout.Single) return this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start);
        if (this.pageLayout == PageLayout.Double) return Math.ceil(this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start) / 2);
        if (this.pageLayout == PageLayout.Half) return this.pageToPage(page, range, includeOffset, PageCollection.Source, PageOffset.Start);
        return undefined!;
    }
    public rawToPage(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number[] {
        if (this.pageLayout == PageLayout.Single) return [this.pageToPage(page, PageCollection.Full, PageOffset.Start, range, includeOffset)];
        if (this.pageLayout == PageLayout.Double) return [this.pageToPage(page * 2, PageCollection.Full, PageOffset.Start, range, includeOffset), this.pageToPage(page * 2, PageCollection.Full, PageOffset.Start, range, includeOffset) - 1]
        if (this.pageLayout == PageLayout.Half) return [this.pageToPage(page, PageCollection.Source, PageOffset.Start, range, includeOffset)];
        return undefined!;
    }
    public pageToView(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number {
        if (this.pageLayout == PageLayout.Single) return this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start);
        if (this.pageLayout == PageLayout.Double) return Math.ceil(this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start) / 2);
        if (this.pageLayout == PageLayout.Half) return Math.ceil(this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start) / 2);
        return undefined!; 
    }
    public viewToPages(view: number, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number[] {
        if (this.pageLayout == PageLayout.Single) return [this.offsetToStart(view, range, includeOffset)];
        if (this.pageLayout == PageLayout.Double) return [this.offsetToStart(view * 2, range, includeOffset) - 1, this.offsetToStart(view * 2, range, includeOffset)];
        if (this.pageLayout == PageLayout.Half) return [this.offsetToStart(view * 2, range, includeOffset) - 1, this.offsetToStart(view * 2, range, includeOffset)];
        return undefined!; 
    }





    /*// public firstExclude: number = 0;
    // public lastExclude: number = 0;
    
    // public first: number = 1;
    // public last: number = 10;
    // public get firstFull(): number {
    //     return this.first - this.firstExclude;
    // }
    // public get lastFull(): number {
    //     return this.last + this.lastExclude;
    // }
    // public set firstFull(page: number) {
    //     this.first = page + this.firstExclude;
    // }
    // public set lastFull(page: number) {
    //     this.last = page - this.lastExclude;
    // }

    // public get totalPages() {
    //     return (this.last - this.first) - 1;
    // }
    // public set totalPages(pages: number) {
    //     this.first = 1;
    //     this.last = pages;
    // }
    // public get totalPagesFull() {
    //     return (this.lastFull - this.firstFull) + 1;
    // }
    // public set totalPagesFull(pages: number) {
    //     this.firstFull = 1;
    //     this.lastFull = pages;
    // }
    
    // //VIEW MANAGEMENT
    // public pagesPerView: number = 2;
    // public get pagesPerFirst(): number {
    //     return this._pagesPerFirst;
    // }
    // public get pagesPerLast(): number {
    //     return this._pagesPerLast;
    // }
    // public set pagesPerFirst(pages: number) {
    //     this._pagesPerLast = (this.totalPagesFull - this.firstExclude) % this.pagesPerView;
    //     this._pagesPerFirst = pages;
    // }
    // public set pagesPerLast(pages: number) {
    //     this._pagesPerFirst = (this.totalPagesFull - this.lastExclude) % this.pagesPerView;
    //     this._pagesPerLast = pages;
    // }
    // public get totalViews (): number {
    //     let totalViews = Math.floor(this.totalPagesFull / this.pagesPerView);
    //     if (this.pagesPerFirst != 0) {
    //         totalViews += 1;
    //     }
    //     if (this.pagesPerLast != 0) {
    //         totalViews += 1;
    //     }

    //     return totalViews;
    // }
    // private _pagesPerFirst: number = 1
    // private _pagesPerLast: number = 1;

    // //CONVERSION
    // public pageToView(page: number):number { //page number to view number
    //     if (page <= this.first) {
    //         return 1;
    //     }

    //     return Math.ceil((this.totalPagesFull - this.pagesPerFirst) / this.pagesPerView) + (
    //         this.pagesPerFirst > 0 ? 1 : 0
    //     );
    // }
    // public viewToPages(view:number): number[] { //view number to page list
    //     let viewPages: number[] = [];

    //     Math.ceil((this.totalPagesFull - this.pagesPerFirst) / this.pagesPerView)
    //     if (this.pagesPerFirst > 0) {
    //         viewPages[0] = viewPages[0] + 1;
    //     }

    //     for (let i = 1; i < this.pagesPerView; i++) {
    //         viewPages.push(viewPages[0] + i);
    //     }

    //     return viewPages;
    // }
    // public pageToPages(page: number): number[] { //page number to page list
    //     return this.viewToPages(this.pageToView(page));
    // }
    // public pageToRelativePage(page: number): number { //page to page view number
    //     return this.pageToPages(page).indexOf(page);
    // }
    

    // public image: string = "";
    // public description: React.ReactNode;

    // public outputPage(page: number): string {
    //     if (page <= (this.firstFull - 1) + this.firstExclude) {
    //         return "";
    //     }
    //     if (page >= (this.lastFull + 1) - this.lastExclude) {
    //         return "";
    //     }

    //     return Book.outputPage(page);
    // }*/
}
