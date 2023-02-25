import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentController } from './document.controller';
import { DocumentSchema } from './document.schema';
import { DocumentService } from './document.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
