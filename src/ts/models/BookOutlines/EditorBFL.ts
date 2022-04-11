import Book from "./Book";
import BookOutlineInfo from "../BookOutlineInfo";

export default class EditorBFL implements BookOutlineInfo {
    public name: string = "";

    public positions: string[] = [];

    public image: string = "";
    public description: React.ReactNode;
}