import Author from "./Author";
import BookOutlineInfo from "../BookOutlineInfo";
import romanize from "src/ts/helpers/romanize";
import { NumberTree, Page } from "public/vendors/pdfjs-dist/build/pdf.worker";
import { throws } from "assert";
import BookSource, { PageCollection } from "../BookSource";
import { ReactNode } from "react";

export default class Book implements BookOutlineInfo {
    public name!: string;
    public author!: Author;
    public releaseDate!: Date;
    public language?: string;
    public location?: string;
    public get totalPages () {
        return this.source.getTotalPages(PageCollection.Defined)
    };

    public source!: BookSource;

    public image!: string;
    public description!: ReactNode;
}