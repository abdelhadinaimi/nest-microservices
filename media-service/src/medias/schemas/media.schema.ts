import { Schema } from 'mongoose';

export const MediaSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});