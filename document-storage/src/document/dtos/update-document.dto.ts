import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray({
    each: true,
  })
  collobrators?: number[];
}
