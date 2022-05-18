import Author from "./BookOutlines/Author";
import Book from "./BookOutlines/Book";
import EditorBFL from "./BookOutlines/EditorBFL";
import Reader from "./BookOutlines/Reader";
import BookSource from "./BookSource";

export enum Format {
    MP3 = ".mp3", 
    WAV = ".wav"
};
export enum VoiceType {
    VoiceRecording = "Voice Recording", 
    TTS = "Text to Speech (TTS)"
};

export default class BookOutline {
    //profile info
    public book: Book;
    public get author(): Author | undefined {
        return this.book.author;
    }
    public reader?: Reader;
    public editor?: EditorBFL;
    public get source(): BookSource {
        return this.book.source;
    }


    //additional state info
    public readDate?: Date;

    public initialUpdate?: Date;
    public lastUpdate?: Date;

    public type?: VoiceType;
    public format?: Format;

    constructor (
        book: Book,
        reader?: Reader,
        editor?: EditorBFL,

        readDate?: Date,

        initialUpdate?: Date,
        lastUpdate?: Date,
    
        type?: VoiceType,
        format?: Format
    ) {
        this.book = book;
        this.reader = reader;
        this.editor = editor;

        this.readDate = readDate;

        this.initialUpdate = initialUpdate;
        this.lastUpdate = lastUpdate ?? initialUpdate;

        this.type = type;
        this.format = format;
    }
}
