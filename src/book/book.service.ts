import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

async getOccupancyOverview(): Promise<any> {
  const query = { day: 'monday' };
  const documents = await this.bookModel.find(query).sort({ timestamp: 1 });

  let highestAverage: number = -Infinity;
  let lowestAverage: number = Infinity;
  let highestInterval: string = '';
  let lowestInterval: string = '';

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


async getLatestOccupantCount(): Promise<any> {
  const latestBook = await this.bookModel.findOne().sort({ timestamp: -1 });
  return {
    latestOccupantCount: latestBook.occupant_count,
    timestamp: latestBook.timestamp,
    date: latestBook.date,
    day: latestBook.day,
  };
}




  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async latest(): Promise<Book[]> {
    
    const books = await this.bookModel.find().sort({ createdAt: -1 }).limit(1);

    return books
}


  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
