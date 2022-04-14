import React, { ReactNode } from "react";
import BookOutlineInfo from "../BookOutlineInfo";

export default class Author implements BookOutlineInfo {
    public name: string = "John Doe";

    public born: Date = new Date();
    public died?: Date = undefined;
    public get age(): number {
        return (
            this.died != undefined ? this.died.getFullYear() : new Date().getFullYear()
        ) - this.born.getFullYear();
    }
    public location?: string = "Canada";

    public image!: string;
    public description!: ReactNode;
}