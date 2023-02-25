import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { Document } from './document.interface';

@Controller('/')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<Document> {
    return this.documentService.create(
      createDocumentDto.title,
      createDocumentDto.content,
    );
  }

  @Get()
  async findAll(): Promise<Document[]> {
    return this.documentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Document> {
    return this.documentService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    return this.documentService.update(
      id,
      updateDocumentDto.title,
      updateDocumentDto.content,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.documentService.delete(id);
  }
}
