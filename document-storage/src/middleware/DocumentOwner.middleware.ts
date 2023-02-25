import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DocumentService } from '../document/document.service';

@Injectable()
export class DocumentOwnerMiddleware implements NestMiddleware {
  constructor(private readonly documentService: DocumentService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const documentId = req.params.id;
      const document = await this.documentService.findOne(documentId);
      const user = req.userId;
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      if (document.owner !== user) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
