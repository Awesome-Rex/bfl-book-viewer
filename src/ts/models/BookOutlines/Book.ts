import Author from "./Author";
import BookOutlineInfo from "../BookOutlineInfo";
import romanize from "src/ts/helpers/romanize";

export default class Book implements BookOutlineInfo {
    
    static outputPage(page: number): string {
        if (page >= 1) {
            return page.toString();
        } else if (page < 1 || true) {
            return romanize((page * -1) + 1);
        }
    }

    public name!: string;
    public author!: Author;
    public releaseDate!: Date;
    public language?: string;
    public location?: string;

    //PAGE MANAGEMENT (USING FIRSTEXCLUDE AND LASTEXCLUDE)
        //total pages (including excludes)
        //pages (excluding excludes)
    public firstExclude: number = 0;
    public lastExclude: number = 0;
    
    public first: number = 1;
    public last: number = 10;
    public get totalFirst(): number {
        return this.first - this.firstExclude;
    }
    public get totalLast(): number {
        return this.last + this.lastExclude;
    }
    public set totalFirst(page: number) {
        this.first = page + this.firstExclude;
    }
    public set totalLast(page: number) {
        this.last = page - this.lastExclude;
    }

    public get pages() {
        return (this.last - this.first) - 1;
    }
    public set pages(pages: number) {
        this.first = 1;
        this.last = pages;
    }
    public get totalPages() {
        return (this.totalLast - this.totalFirst) + 1;
    }
    public set totalPages(pages: number) {
        this.totalFirst = 1;
        this.totalLast = pages;
    }
    
    //VIEW MANAGEMENT
    public pagesPerView: number = 2;
    public get pagesPerFirst(): number {
        return this._pagesPerFirst;
    }
    public get pagesPerLast(): number {
        return this._pagesPerLast;
    }
    public set pagesPerFirst(pages: number) {
        this._pagesPerLast = (this.totalPages - this.firstExclude) % this.pagesPerView;
        this._pagesPerFirst = pages;
    }
    public set pagesPerLast(pages: number) {
        this._pagesPerFirst = (this.totalPages - this.lastExclude) % this.pagesPerView;
        this._pagesPerLast = pages;
    }
    public get totalViews (): number {
        let totalViews = Math.floor(this.totalPages / this.pagesPerView);
        if (this.pagesPerFirst != 0) {
            totalViews += 1;
        }
        if (this.pagesPerLast != 0) {
            totalViews += 1;
        }

        return totalViews;
    }
    private _pagesPerFirst: number = 1
    private _pagesPerLast: number = 1;

    //CONVERSION
    public pageToView(page: number):number { //page number to view number
        if (page <= this.first) {
            return 1;
        }

        return Math.ceil((this.totalPages - this.pagesPerFirst) / this.pagesPerView) + (
            this.pagesPerFirst > 0 ? 1 : 0
        );
    }
    public viewToPages(view:number): number[] { //view number to page list
        let viewPages: number[] = [];

        Math.ceil((this.totalPages - this.pagesPerFirst) / this.pagesPerView)
        if (this.pagesPerFirst > 0) {
            viewPages[0] = viewPages[0] + 1;
        }

        for (let i = 1; i < this.pagesPerView; i++) {
            viewPages.push(viewPages[0] + i);
        }

        return viewPages;
    }
    public pageToPages(page: number): number[] { //page number to page list
        return this.viewToPages(this.pageToView(page));
    }
    public pageToRelativePage(page: number): number { //page to page view number
        return this.pageToPages(page).indexOf(page);
    }
    

    public image: string = "";
    public description: React.ReactNode;

    public outputPage(page: number): string {
        if (page <= (this.totalFirst - 1) + this.firstExclude) {
            return "";
        }
        if (page >= (this.totalLast + 1) - this.lastExclude) {
            return "";
        }

        return Book.outputPage(page);
    }
}