import BookOutline from "./BookOutline";
import Book from "./BookOutlines/Book";
import { PageCollection, PageOffset } from "./BookSource";

export default class BookProgress {
    public outline: BookOutline;

    public get book() {
        return this.outline.book;
    }
    public get author() {
        return this.outline.author;
    }
    public get reader() {
        return this.outline.reader;
    }
    public get editor() {
        return this.outline.editor;
    }
    public get source() {
        return this.book.source;
    }

    constructor(
        outline: BookOutline,
        currentView: number = 1
    ) {
        this.outline = outline;
        this._currentView = currentView;
    }

    // current page
    public get currentPages(): number[] {
        return this.source.viewToPages(this.currentView, PageCollection.Full, PageOffset.Offset);
    }
    public get currentPage(): number {
        return this.currentPages[0];
    }
    public get currentPageFirst(): number {
        return this.currentPages[0];
    }
    public get currentPageLast(): number {
        return this.currentPages[this.currentPages.length - 1];
    }
    public setCurrentPage(page: number) {
        this.currentView = this.source.pageToView(page);
    }

    //current view
    public get currentView(): number {
        return this._currentView;
    }
    public set currentView(view: number) {
        /*if (this.source.viewIncluded(view)) this._currentView = view;
        else */this._currentView = this.source.getViewRange().clamp(view);
    }
    private _currentView: number;



    // current page progress
    public get currentPageProgress(): number {
        return this.source.pageToProgress(this.currentPageLast, PageCollection.Defined);
    }
    public set currentPageProgress(progress: number) {
        this.currentView = this.source.pageToView(this.source.progressToPage(progress, PageCollection.Defined), PageCollection.Defined);
    }

    //current full page progress
    public get currentPageFullProgress(): number {
        return this.source.pageToProgress(this.currentPageLast, PageCollection.Full);
    }
    public set currentPageFullProgress(progress: number) {
        this.currentView = this.source.pageToView(this.source.progressToPage(progress, PageCollection.Full), PageCollection.Full);
    }

    //current view progress
    public get currentViewProgress(): number {
        return this.source.viewToProgress(this.currentView);
    }
    public set currentViewProgress(progress: number) {
        this.currentView = this.source.progressToView(progress);
    }


    
    // output/format data into string readable format
    public get outputCurrentPages(): string[] {
        return this.source.outputView(this.currentView);
    }
    public get outputCurrentPageProgress(): string {
        return this.source.outputProgress(this.currentPageProgress);
    }
    public get outputCurrentPageFullProgress(): string {
        return this.source.outputProgress(this.currentPageFullProgress);
    }
    public get outputCurrentViewProgress(): string {
        return this.source.outputProgress(this.currentViewProgress);
    }
}