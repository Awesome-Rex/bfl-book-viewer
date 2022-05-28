import Author from "./Author";
import BookSource, { PageCollection } from "../BookSource";
import { ReactNode } from "react";

export default class Book {
    public readonly source: BookSource;

    public readonly title: string;
    public readonly author?: Author;
    public readonly illustrator?: string;
    public readonly releaseDate?: Date;
    public readonly language?: string;
    public get totalPages () {
        return this.source.getTotalPages(PageCollection.Defined);
    };
    public get totalPagesFull () {
        return this.source.getTotalPages(PageCollection.Source);
    }

    public readonly cover?: string | number;
    public readonly description?: ReactNode;

    constructor (
        source: BookSource,
        
        name: string,
        author?: Author,
        illustrator?: string,
        releaseDate?: Date,
        language?: string,

        cover?: string | number,
        description?: ReactNode
    ) {
        this.source = source;

        this.title = name;
        this.author = author;
        this.illustrator = illustrator;
        this.releaseDate = releaseDate;
        this.language = language;

        this.cover = cover;
        this.description = description;
    }
}