/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export declare enum Category {
    ADVENTURE = "Adventure",
    CALSSICS = "Classics",
    CRIME = "Crime",
    FANTASY = "Fantasy"
}
export declare class Book {
    title: string;
    description: string;
    author: string;
    price: number;
    category: Category;
    occupant_count: number;
    timestamp: string;
    day: string;
    date: string;
    pwdhash: string;
    empdid: string;
    verified: string;
}
export declare class hvac {
}
export declare const BookSchema: import("mongoose").Schema<Book, import("mongoose").Model<Book, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Book>;
export declare const hvacSchema: import("mongoose").Schema<hvac, import("mongoose").Model<hvac, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, hvac>;
