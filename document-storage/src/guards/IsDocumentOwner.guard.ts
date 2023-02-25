import { DocumentService } from '../document/document.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class IsDocumentOwner implements CanActivate {
  constructor(private readonly documentService: DocumentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const user = request.user;
    const document = await this.documentService.findOne(params.id);

    if (document.owner === user.userId) return true;
    else return false;
  }
}
