import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

async function bootstrap() {
  if (!PORT) {
    throw new Error('Error: not find env.PORT');
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}

bootstrap()
  .then(() => {
    console.log(`server start on port ${PORT}`);
  })
  .catch((err: Error) => {
    console.log(`Exception -> ${err}`);
  });
