import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { Document } from './document.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('/')
@UseGuards(AuthGuard('jwt'))
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<Document> {
    const user = req.userId;
    return this.documentService.create(
      createDocumentDto.title,
      createDocumentDto.content,
      user,
      createDocumentDto.collobrators,
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

  @Put(':id/collobrators')
  async addCollobrators(
    @Param('id') id: string,
    @Body() collobrators: number[],
  ): Promise<Document> {
    return this.documentService.addCollobrators(id, collobrators);
  }
}
