import Author from "./BookOutlines/Author";
import Book from "./BookOutlines/Book";
import EditorBFL from "./BookOutlines/EditorBFL";
import Reader from "./BookOutlines/Reader";

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
    public book!: Book;
    public get author(): Author {
        return this.book.author;
    }
    public reader!: Reader;
    public editor!: EditorBFL;



    //additional state info
    public readDate!: Date;

    public initialUpdate!: Date;
    public lastUpdate?: Date = this.initialUpdate;

    public type?: VoiceType;
    public format?: Format;
}