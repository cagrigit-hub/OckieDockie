import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './document.interface';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('Document') private readonly documentModel: Model<Document>,
  ) {}

  async create(
    title: string,
    content: string,
    owner: number,
    collobrators?: number[],
  ): Promise<Document> {
    if (!collobrators) collobrators = [];
    const createdDocument = new this.documentModel({
      title,
      content,
      owner,
      collobrators,
    });
    return createdDocument.save();
  }
  async addCollobrators(id: string, collobrators: number[]): Promise<Document> {
    const options = { new: true };
    return this.documentModel.findByIdAndUpdate(id, { collobrators }, options);
  }

  async findAll(): Promise<Document[]> {
    return this.documentModel.find().exec();
  }

  async findOne(id: string): Promise<Document> {
    return this.documentModel.findById(id).exec();
  }

  async update(id: string, title: string, content: string): Promise<Document> {
    const options = { new: true };
    return this.documentModel.findByIdAndUpdate(
      id,
      { title, content },
      options,
    );
  }

  async delete(id: string): Promise<any> {
    return this.documentModel.findByIdAndRemove(id);
  }
}
