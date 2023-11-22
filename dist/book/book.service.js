"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const book_schema_1 = require("./schemas/book.schema");
let BookService = class BookService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async getOccupancyOverview() {
        const query = { day: 'monday' };
        const documents = await this.bookModel.find(query).sort({ timestamp: 1 });
        let highestAverage = -Infinity;
        let lowestAverage = Infinity;
        let highestInterval = '';
        let lowestInterval = '';
        let currentHour = documents[0].timestamp;
        let startIdx = 0;
        let sum = 0;
        let count = 0;
        for (let i = 0; i < documents.length; i++) {
            const doc = documents[i];
            sum += doc.occupant_count;
            count += 1;
            const currentHourParts = currentHour.split(':');
            const nextHourParts = doc.timestamp.split(':');
            if (nextHourParts[0] !== currentHourParts[0] || i === documents.length - 1) {
                const average = sum / count;
                if (average > highestAverage) {
                    highestAverage = average;
                    highestInterval = `${currentHour} to ${doc.timestamp}`;
                }
                if (average < lowestAverage) {
                    lowestAverage = average;
                    lowestInterval = `${currentHour} to ${doc.timestamp}`;
                }
                sum = 0;
                count = 0;
                currentHour = doc.timestamp;
            }
        }
        return {
            overview: {
                highestAverageOccupancy: highestAverage,
                highestOccupancyTimeInterval: highestInterval,
                lowestAverageOccupancy: lowestAverage,
                lowestOccupancyTimeInterval: lowestInterval,
            },
        };
    }
    async getLatestOccupantCount() {
        const latestBook = await this.bookModel.findOne().sort({ timestamp: -1 });
        return {
            latestOccupantCount: latestBook.occupant_count,
            timestamp: latestBook.timestamp,
            date: latestBook.date,
            day: latestBook.day,
        };
    }
    async create(book) {
        const res = await this.bookModel.create(book);
        return res;
    }
    async latest() {
        const books = await this.bookModel.find().sort({ createdAt: -1 }).limit(1);
        return books;
    }
    async findById(id) {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new common_1.NotFoundException('Book not found.');
        }
        return book;
    }
    async updateById(id, book) {
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        });
    }
    async deleteById(id) {
        return await this.bookModel.findByIdAndDelete(id);
    }
    async signUpUser(did, password) {
        const existingUser = await this.bookModel.findOne({ empdid: did });
        if (existingUser) {
            if (existingUser.empdid === did) {
                existingUser.pwdhash = password;
                existingUser.verified = 'yes';
                await existingUser.save();
            }
            else {
                throw new common_1.NotFoundException('Mismatched empdid.');
            }
        }
        else {
            throw new common_1.NotFoundException('User not found.');
        }
    }
};
BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map