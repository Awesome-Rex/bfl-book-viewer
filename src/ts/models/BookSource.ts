import { stringify } from "querystring";
import { Page } from "react-pdf";
import { isThisTypeNode } from "typescript";
import { DataManagement } from "../helpers/DataManagement/DataManagement";
import { PageRange } from "./PageRange";
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

export default class BookSource { //++++++++++++++++++++WORKING STATE TO BE DETERMINED (YET TO BE KNOWN WHETHER METHODS WILL WORK OR NOT)
    static outputPage(page: number): string {
        if (page >= 1)          return page.toString();
        if (page < 1 || true)   return DataManagement.romanize((page * -1) + 1);
    }

    // //PAGE MANAGEMENT (USING FIRSTEXCLUDE AND LASTEXCLUDE)
    //     //total pages (including excludes)
    //     //pages (excluding excludes)

    public readonly location: string;

    public readonly pageLayout: PageLayout;
    public readonly totalPagesRaw: number;

    //page counting, page range
    public readonly pageOffset: number;             // [all]    //shift towards page 1 (according to source range)
    public readonly firstExclude: number;   // [all]    //excluded pages left (according to source range)
    public readonly lastExclude: number;    // [all]    //excluded pages right (according to source range)
    public readonly halfFirst: boolean;  // [half]   //whether or not first view contains 1 page
    public readonly halfLast: boolean;   // [half]   //whether or not last view contains 1 page

    constructor (
        link: string,

        pageLayout: PageLayout,
        totalPagesRaw: number,
    
        //page counting, page range
        pageOffset: number = 0,             // [all]    //shift towards page 1 (according to source range)
        firstExclude: number = 0,   // [all]    //excluded pages left (according to source range)
        lastExclude: number = 0,    // [all]    //excluded pages right (according to source range)
        halfFirst: boolean = false,  // [half]   //whether or not first view contains 1 page
        halfLast: boolean = false,   // [half]   //whether or not last view contains 1 page
    ) {
        this.location = link;

        this.pageLayout = pageLayout;
        this.totalPagesRaw = totalPagesRaw;

        this.pageOffset = pageOffset;
        this.firstExclude = firstExclude;
        this.lastExclude = lastExclude;
        this.halfFirst = halfFirst
        this.halfLast = halfLast;
    }

    public getTotalPages (range: PageCollection): number {
        if (range == PageCollection.Defined) {
            if (this.pageLayout == PageLayout.Single) return this.totalPagesRaw - this.firstExclude - this.lastExclude;
            if (this.pageLayout == PageLayout.Double) return this.totalPagesRaw * 2 - (
                (this.halfFirst ? 1 : 0) + 
                (this.halfLast ? 1 : 0)
            ) - this.firstExclude - this.lastExclude;
            if (this.pageLayout == PageLayout.Half) return this.totalPagesRaw - this.firstExclude - this.lastExclude;
        }
        if (range == PageCollection.Source) {
            if (this.pageLayout == PageLayout.Single) return this.totalPagesRaw;
            if (this.pageLayout == PageLayout.Double) return this.totalPagesRaw * 2 - (
                (this.halfFirst ? 1 : 0) + 
                (this.halfLast ? 1 : 0)
            );
            if (this.pageLayout == PageLayout.Half) return this.totalPagesRaw;
        }
        if (range == PageCollection.Full) {
            if (this.pageLayout == PageLayout.Single) return this.totalPagesRaw;
            if (this.pageLayout == PageLayout.Double) return this.totalPagesRaw * 2;
            if (this.pageLayout == PageLayout.Half) return this.totalPagesRaw + (
                (this.halfFirst ? 1 : 0) + 
                (this.halfLast ? 1 : 0)
            );
        }
        if (range == PageCollection.Raw) return this.totalPagesRaw;
        return undefined!;
    }
    public getTotalViews(): number {
        if (this.pageLayout == PageLayout.Single) return this.getTotalPages(PageCollection.Full);
        if (this.pageLayout == PageLayout.Double) return this.getTotalPages(PageCollection.Full) / 2; //*********************YET TO BE COMPLETELY TESTED/VERIFIED
        if (this.pageLayout == PageLayout.Half) return this.getTotalPages(PageCollection.Full) / 2;
        return undefined!; 
    }
    public getPageRange(range: PageCollection, includeOffset: PageOffset): PageRange {
        if (includeOffset == PageOffset.Offset) { 
            if (range == PageCollection.Defined) return new PageRange(
                +1 - this.pageOffset + this.firstExclude, 
                -0 - this.pageOffset + this.firstExclude + this.getTotalPages(PageCollection.Defined)
            );
            if (range == PageCollection.Source) return new PageRange(
                +1 - this.pageOffset, 
                -0 - this.pageOffset + this.getTotalPages(PageCollection.Source)
            );
            if (range == PageCollection.Full) return new PageRange(
                +1 - this.pageOffset - (this.halfFirst ? 1 : 0),  
                -0 - this.pageOffset - (this.halfFirst ? 1 : 0) + this.getTotalPages(PageCollection.Full)
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
            let lean: number = this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start) % 2;
            if (lean == 1) return PageSide.Left;
            if (lean == 0) return PageSide.Right;
        }
        return undefined!;
    }
    public pageToPageOffset(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffsetA: PageOffset = PageOffset.Offset, includeOffsetB: PageOffset = PageOffset.Offset) { 
        if (includeOffsetA == includeOffsetB) return page;
        if (includeOffsetA == PageOffset.Start && includeOffsetB == PageOffset.Offset) return this.getPageRange(range, PageOffset.Offset).min + (page - this.getPageRange(range, PageOffset.Start).min); // offset to start
        if (includeOffsetA == PageOffset.Offset && includeOffsetB == PageOffset.Start) return this.getPageRange(range, PageOffset.Start).min + (page - this.getPageRange(range, PageOffset.Offset).min); //start to offset
        return undefined!;
    } // method exclude PageCollection.Raw
    public pageToPage( // CANNOT CALCULATE FOR RAW PAGES
        page: number = 1, 
        rangeA: PageCollection = PageCollection.Defined, includeOffsetA: PageOffset = PageOffset.Offset, 
        rangeB: PageCollection = PageCollection.Defined, includeOffsetB: PageOffset = PageOffset.Offset
    ): number {
        if (rangeA == PageCollection.Raw) throw new Error("Cannot use page collection type 'raw' in pageToPage() function, consider using rawToPage() function instead.")
        if (rangeB == PageCollection.Raw) throw new Error("Cannot use page collection type 'raw' in pageToPage() function, consider using pageToRaw() function instead.")
        return this.pageToPageOffset(this.pageToPageOffset(page, rangeA, includeOffsetA, PageOffset.Offset), rangeB, PageOffset.Offset, includeOffsetB);
    }
    public pageToRaw(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number[] {
        if (this.pageLayout == PageLayout.Single) return [this.pageToView(page, range, includeOffset)];
        if (this.pageLayout == PageLayout.Double) return [this.pageToView(page, range, includeOffset)];
        if (this.pageLayout == PageLayout.Half) return [...this.viewToPages(this.pageToView(page, range, includeOffset), PageCollection.Source, PageOffset.Start)];
        return undefined!;
    }
    public rawToPages(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number[] {
        if (this.pageLayout == PageLayout.Single) return [...this.viewToPages(page, range, includeOffset)];
        if (this.pageLayout == PageLayout.Double) return [...this.viewToPages(page, range, includeOffset)];
        if (this.pageLayout == PageLayout.Half) return [...this.viewToPages(this.pageToView(page, PageCollection.Source, PageOffset.Start), range, includeOffset)];
        return undefined!;
    }
    public pageToView(page: number = 1, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number {
        if (this.pageLayout == PageLayout.Single) return this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start);
        if (this.pageLayout == PageLayout.Double) return Math.ceil(this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start) / 2);
        if (this.pageLayout == PageLayout.Half) return Math.ceil(this.pageToPage(page, range, includeOffset, PageCollection.Full, PageOffset.Start) / 2);
        return undefined!; 
    }
    public viewToPages(view: number, range: PageCollection = PageCollection.Defined, includeOffset: PageOffset = PageOffset.Offset): number[] {
        if (this.pageLayout == PageLayout.Single) return [this.pageToPage(view, PageCollection.Full, PageOffset.Start, range, includeOffset)];
        if (this.pageLayout == PageLayout.Double) return [this.pageToPage(view * 2 - 1, PageCollection.Full, PageOffset.Start, range, includeOffset), this.pageToPage(view * 2, PageCollection.Full, PageOffset.Start, range, includeOffset)];
        if (this.pageLayout == PageLayout.Half) return [this.pageToPage(view * 2 - 1, PageCollection.Full, PageOffset.Start, range, includeOffset), this.pageToPage(view * 2, PageCollection.Full, PageOffset.Start, range, includeOffset)];
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
