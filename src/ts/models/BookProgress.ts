import BookOutline from "./BookOutline";
import Book from "./BookOutlines/Book";

export default class BookProgress {
    public outline!: BookOutline;

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



    public get currentPages(): number[] {
        return this._currentPages;
    }
    public get currentPageFirst(): number {
        return this.currentPages[0];
    }
    public get currentPageLast(): number {
        return this.currentPages[this.currentPages.length - 1];
    }
    public setCurrentPage(page: number) {
        this._currentPages = this.book.pageToPages(page);
    }
    private _currentPages: number[] = [0, 1];
    
    

    public get currentView(): number {
        return this.book.pageToView(this.currentPages[0]);
    }
    public set currentView(view: number) {
        this.setCurrentPage(this.book.viewToPages(view)[0]);
    }

    public get progressView(): number {
        return (this.currentView - 1) / (this.book.totalViews - 1);
    }
    public set progressView(progress: number) {
        this.currentView = Math.round((this.book.totalViews - 1) * progress) + 1; //this.currentView = Math.round(this.book.totalViews * progress);
    }

    public get progressPage() {
        return (this.currentPageLast - (this.book.first - 1)) / this.book.pages;
    }
    public set progressPage(progress: number) {
        this.currentView = Math.round((this.book.pages - 1) * progress) + this.book.first;
    }

    public get progressTotalPages(): number {
        return (this.currentPageLast - (this.book.totalFirst - 1)) / this.book.pages;
    }
    public set progressTotalPages(progress: number) {
        this.currentView = Math.round((this.book.totalPages - 1) * progress) + this.book.totalFirst;
    }
}