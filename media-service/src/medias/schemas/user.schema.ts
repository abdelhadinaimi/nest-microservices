import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    username: String,
    avatarURL: String,
  }
);