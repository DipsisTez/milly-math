import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/prompt/:text')
  async getPrompt(@Param('text') text: string) {
    const data = await this.appService.getPrompt(text);
    return JSON.stringify(data);
  }

  @Get('')
  getHello() {
    return 'Not found';
  }
}
