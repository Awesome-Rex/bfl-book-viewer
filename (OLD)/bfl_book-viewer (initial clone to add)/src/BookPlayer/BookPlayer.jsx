import React, { useState, useEffect } from "react";
import "plain";

class Book {
    constructor(
        name = "New Book", 
        author = "Author", 
        publish = "August 12 2005", 

        totalPages = 10,
        first = 1,

        pagesPerView = 2
    ) {
        //this._ = _;
        this.name = name;
        this.author = author;
        this.publish = publish;
        
        this.first = 1;
        this.last = first + (totalPages - 1);

        this.pagesPerView = pagesPerView;
    }

    get totalPages() {
        return this.last - this.first;
    }
}

class BookResource {

}

class ImageSequence extends BookResource {

}

class PDF extends BookResource {

}

class DOC extends BookResource {

}

class RTF extends BookResource {

}


export const BookPlayer = () => {
    book = new Book("The Cat in the Hat", "Dr. Seuss", "March 12, 1957", 10);

    const [book, setBook] = useState([]);
    const [page, setPage] = useState(1);
    
    return (
        <>
            Book Player
        </>
    );
};