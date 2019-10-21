import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    username: { type: String, minlength: 5, maxlength: 20, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    avatarURL: { type: String },
    profilBio: { type: String, maxlength: 512 },
  },
  {
    timestamps: true
  },
);
