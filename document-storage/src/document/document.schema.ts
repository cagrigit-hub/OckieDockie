import { Schema } from 'mongoose';

export const DocumentSchema = new Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true },
);
