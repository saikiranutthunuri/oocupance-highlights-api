import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop()
  occupant_count: number;

  @Prop()
  timestamp: string;
   
  @Prop()
  day: string;
  date: string;

  @Prop()
  pwdhash: string;

  @Prop()
  empdid: string;

  @Prop()
  verified: string;



}

export class hvac {}

export const BookSchema = SchemaFactory.createForClass(Book);
export const hvacSchema = SchemaFactory.createForClass(hvac);