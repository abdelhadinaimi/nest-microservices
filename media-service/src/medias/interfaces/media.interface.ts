import { Document } from 'mongoose';

export interface IMedia extends Document {
  readonly title: string;
  readonly description: number;
}