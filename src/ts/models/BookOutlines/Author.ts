import React, { ReactNode } from "react";

export default class Author {
    public readonly name: string;

    public readonly born?: Date;
    public readonly died?: Date;
    public get age(): number | undefined {
        if (this.born != undefined) {
            return (
                this.died != undefined ? this.died.getFullYear() : new Date().getFullYear()
            ) - this.born.getFullYear();
        }
        else {
            return undefined;
        }
    }
    public readonly location?: string;

    public readonly photo?: string;
    public readonly description?: ReactNode;

    constructor (
        name: string,

        born?: Date,
        died?: Date,

        location?: string,

        photo?: string,
        description?: ReactNode
    ) {
        this.name = name;

        this.born = born;
        this.died = died;

        this.location = location;
        
        this.photo = photo;
        this.description = description;
    }
}