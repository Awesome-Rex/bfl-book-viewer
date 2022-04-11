import Book from "./Book";
import BookInfoProfile from "../BookOutlineInfo";



export default class Reader implements BookInfoProfile {
    public service: string = ""; //service name (story time with owl)
    public name: string = ""; //reader name
    
    public image: string = "";
    public description: React.ReactNode;
}