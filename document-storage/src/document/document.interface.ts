import { Document as MongooseDocument } from 'mongoose';

export interface Document extends MongooseDocument {
  readonly title: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
