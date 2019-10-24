import { Document } from 'mongoose';
import { ICreator } from './creator.interface';

export interface IMedia extends Document {
  readonly title: string;
  readonly description: string;
  readonly tags: string[];
  // readonly likes: number;
  readonly categorie: string;
  // readonly comments: any[];
  readonly visibility: string;
  readonly creator: ICreator;
  readonly createdAt: Date;
  readonly updatedAt: Date; 
}