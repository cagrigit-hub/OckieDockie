import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from './document.schema';
import { DocumentService } from './document.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
  ],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
