import { Injectable } from '@nestjs/common';
import manager from './lib/index';

@Injectable()
export class AppService {
  async getPrompt(query: string): Promise<string> {
    let anwser: string;

    if (query === '') {
      return 'Empty line';
    }

    try {
      anwser = await manager.client.sendPrompt(query);
    } catch (err: any) {
      console.log(`Exception -> ${err}`);
      anwser = 'unknown error';
    } finally {
      return anwser;
    }
  }
}
