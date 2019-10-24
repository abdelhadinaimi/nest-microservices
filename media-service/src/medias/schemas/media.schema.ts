import { Schema } from 'mongoose';
import { UserSchema } from './user.schema';

export const MediaSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 2000, default: "" },
    tags: [String],
    // likes: { type: Number, default: 0 },
    categorie: { type: String, default: "" },
    //comments: { type: Array<Comment>() },
    visibility: { type: String, default: "public" },
    creator: {
      required: true,
      type: UserSchema
    }
  },
  {
    timestamps: true
  }
);