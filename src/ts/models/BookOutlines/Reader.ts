import Book from "./Book";
import { ReactNode } from "react";



export default class Reader {
    public readonly service?: string; //service name (story time with owl)
    public readonly name?: string; //reader name
    
    public readonly picture?: string;
    public readonly description?: ReactNode;

    constructor (
        service?: string, //service name (story time with owl)
        name?: string, //reader name
    
        picture?: string,
        description?: ReactNode
    ) {
        this.service = service;
        this.name = name;

        this.picture = picture;
        this.description = description;
    }
}