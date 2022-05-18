import Book from "./Book";

export default class EditorBFL {
    public readonly name: string;
    public readonly positions: string[];

    public readonly picture?: string;
    public readonly description?: React.ReactNode;

    constructor (
        name: string,
        positions?: string[],

        picture?: string,
        description?: React.ReactNode
    ) {
        this.name = name;
        this.positions = positions ?? [];

        this.picture = picture;
        this.description = description;
    }
}
