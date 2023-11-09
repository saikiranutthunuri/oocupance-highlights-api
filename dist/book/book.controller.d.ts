import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    getAllBooks(): Promise<Book[]>;
    getLatestOccupantCount(): Promise<any>;
    getBook(id: string): Promise<Book>;
    deleteBook(id: string): Promise<Book>;
}
