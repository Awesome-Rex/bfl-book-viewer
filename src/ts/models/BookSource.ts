import { stringify } from "querystring";
import { Page } from "react-pdf";
import { DataManagement } from "../helpers/DataManagement/DataManagement";
// import { PageTrack } from "./PageTrack";
// import ViewTrack from "./ViewTrack";

export enum PageLayout {Half = 0.5, Double = 2, Single = 1}
export enum PageSide {Left, Right, Center, Both}
export enum PageOffset {Offset, Start}
export enum PageCollection {Defined, Source, Full, Raw}
//  defined = pages from source excluded    (< source)
//  source  = total pages from source       (= source)
//  full    = pages from source included    (> source)
//  raw     = pages from source raw         (~ source)

export class PageRange {
    public get min () {
        return this._min;
    }
    public set min (value: number) {
        if (value <= this.max) {
            this._min = value;
        } else {
            this._min = this._max;
            this._max = value;
        }
    }
    public get max() {
        return this._max;
    }
    public set max (value: number) {
        if (value >= this.min) {
            this._max = value;
        } else {
            this._max = this._min;
            this._min = value;
        }
    }

    private _min!: number;
    private _max!:number;

    public progressToPoint (progress: number): number { // progress to page
        return this.min + ((this.max - this.min) * progress);
    }
    public pointToProgress (point: number): number { // page to progress
        return (point - this.min) / (this.max - this.min);
    }
    public between (point: number, inclusive: boolean = true): boolean {
        if (inclusive) return point >= this.min && point <= this.max;
        if (!inclusive) return point > this.min && point < this.max;
        return undefined!;
    }
    public clamp (point: number): number {
        if (point < this.min) return this.min;
        if (point > this.max) return this.max;
        return point;
    }

    constructor (min: number = 0, max: number = 10) {
        this.min = min;
        this.max = max;
    }
}

export default class BookSource { //++++++++++++++++++++WORKING STATE TO BE DETERMINED (YET TO BE KNOWN WHETHER METHODS WILL WORK OR NOT)
    static outputPage(page: number): string {
        if (page >= 1)          return page.toString();
        if (page < 1 || true)   return DataManagement.romanize((page * -1) + 1);
    }

    // //PAGE MANAGEMENT (USING FIRSTEXCLUDE AND LASTEXCLUDE)
    //     //total pages (including excludes)
    //     //pages (excluding excludes)

    public readonly link: string;

    public readonly pageLayout: PageLayout;
    public readonly totalPagesRaw: number;

    //page counting, page range
    public readonly pageOffset;             // [all]    //shift towards page 1 (according to source range)
    public readonly firstExclude: number;   // [all]    //excluded pages left (according to source range)
    public readonly lastExclude: number;    // [all]    //excluded pages right (according to source range)
    public readonly oddFirst: boolean;  // [half]   //whether or not first view contains 1 page
    public readonly oddLast: boolean;   // [half]   //whether or not last view contains 1 page

    constructor (
        link: string,

        pageLayout: PageLayout,
        totalPagesRaw: number,
    
        //page counting, page range
        pageOffset = 0,             // [all]    //shift towards page 1 (according to source range)
        firstExclude: number = 0,   // [all]    //excluded pages left (according to source range)
        lastExclude: number = 0,    // [all]    //excluded pages right (according to source range)
        oddFirst: boolean = false,  // [half]   //whether or not first view contains 1 page
        oddLast: boolean = false,   // [half]   //whether or not last view contains 1 page
    ) {
        this.link = link;

        this.pageLayout = pageLayout;
        this.totalPagesRaw = totalPagesRaw;

        this.pageOffset = pageOffset;
        this.firstExclude = firstExclude;
        this.lastExclude = lastExclude;
        this.oddFirst = oddFirst
        this.oddLast = oddLast;
    }

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
    public viewIncluded(view: number) {
        return this.getViewRange().between(view);
    }

    //private conversion methods (methods exclude PageCollection.Raw)
    protected startToOffset(page: number = 1, range: Omit<PageCollection, "Raw"> = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number { //page to global offset (to PageOffset.Offset)
        if (includeOffset == PageOffset.Offset) return page;
        else if (includeOffset == PageOffset.Start) return page + this.getPageRange(<PageCollection>range, PageOffset.Offset).min - 1;
        return undefined!;
    }
    protected offsetToStart(page: number = 1, range: Omit<PageCollection, "Raw"> = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number { //global offset to page (from PageOffset.Offset)
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
    public pageToProgress(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number {
        return this.getPageRange(range, includeOffset).pointToProgress(page);
    }
    public progressToPage(progress: number, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset) {
        return Math.round(this.getPageRange(range, includeOffset).progressToPoint(progress));
    } 
    public viewToProgress(view: number) {
        return this.getViewRange().pointToProgress(view);
    }
    public progressToView(progress: number) {
        return Math.round(this.getViewRange().progressToPoint(progress));
    }

    // string output page +++++++++++++++++++++++++MAY NEED TO BE CHANGED/FIXED (parameters, return statements)
    public outputPage(page: number, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): string {
        if (this.pageIncluded(page, range, includeOffset)) {
            return BookSource.outputPage(this.pageToPage(page, range, includeOffset));
        } else {
            return "";
        }
    }
    public outputView(view: number): string[] {
        return this.viewToPages(view).map((elem, i, arr) => this.outputPage(elem));
    }
    public outputProgress(progress: number): string {
        return Math.round(progress * 100) + "%";
    }
}
