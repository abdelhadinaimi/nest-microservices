import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
}