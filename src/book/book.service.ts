import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import * as argon2 from 'argon2';

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
  

  async signUpUser(did: string, password: string): Promise<void> {
    // Check if there is any document in the collection with the given DID
    const existingUser = await this.bookModel.findOne({ empdid: did });

    if (existingUser) {
      // Check if the found document's empdid matches the provided did
      if (existingUser.empdid === did) {
        // Hash the provided password
        const hashedPassword = await this.hashPassword(password);

        // If a match is found, update the password and set 'verified' to 'yes'
        existingUser.pwdhash = hashedPassword;
        existingUser.verified = 'yes';

        // Save the updated user document
        await existingUser.save();
      } else {
        // If empdid does not match, you can choose to handle this case accordingly
        throw new NotFoundException('Mismatched empdid.');
      }
    } else {
      // If no document is found, you can choose to handle this case accordingly
      throw new NotFoundException('User not found.');
    }
  }

  // Password hashing function
   private async hashPassword(password: string): Promise<string> {
    try {
      // Implement your password hashing logic here using argon2
      const hashedPassword = await argon2.hash(password);
      return hashedPassword;
    } catch (error) {
      // Handle hashing error
      throw new Error('Error hashing password');
    }
  }



  
}
