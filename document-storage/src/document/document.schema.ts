import { Schema } from 'mongoose';

export const DocumentSchema = new Schema(
  {
    title: String,
    content: String,
    owner: Number,
    collobrators: [Number],
  },
  { timestamps: true },
);
