import { PageLayout, PageCollection, PageSide } from "./BookSource";

// export class PageTrack {
//     public readonly pageLayout!: PageLayout;

//     public readonly side!: PageSide;

//     public readonly defined?: number;
//     public readonly source?: number;
//     public readonly raw?: number;
//     public readonly full?: number;

//     public readonly definedProgress!: number;
//     public readonly sourceProgress!: number;
//     public readonly rawProgress!: number;
//     public readonly fullProgress!: number;

//     public getPage(range: PageCollection): number {
//         switch (range) {
//             // case PageRange.Raw: return this.raw;
//             // case PageRange.Source: return this.source;
//             // case PageRange.Defined: return this.defined;
//             // case PageRange.Full: return this.full;
//         }

//         return undefined!;
//     }

//     constructor (
//         pageLayout: PageLayout,
//         side: PageSide,
//         defined?: number,
//         source?: number,
//         raw?: number,
//         full?: number
//     ) {
//         this.pageLayout = pageLayout;

//         this.side = side;

//         this.defined = defined;
//         this.source = source;
//         this.raw = raw;
//         this.full = full;
//     }
// }
