import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
export declare class BookService {
    private bookModel;
    constructor(bookModel: mongoose.Model<Book>);
    getOccupancyOverview(): Promise<any>;
    getLatestOccupantCount(): Promise<any>;
    create(book: Book): Promise<Book>;
    latest(): Promise<Book[]>;
    findById(id: string): Promise<Book>;
    updateById(id: string, book: Book): Promise<Book>;
    deleteById(id: string): Promise<Book>;
    signUpUser(did: string, password: string): Promise<void>;
    private hashPassword;
    loginUser(did: string, password: string): Promise<string>;
    updateLockStatus(did: string, lockStatus: string): Promise<void>;
    updateRewardsConsentStatus(did: string, rewardsConsentStatus: string): Promise<void>;
}
