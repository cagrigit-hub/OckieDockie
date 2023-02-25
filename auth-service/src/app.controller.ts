import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/healthx')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): {
    status: string;
  } {
    return this.appService.healthCheck();
  }
}
