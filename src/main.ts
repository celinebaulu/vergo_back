import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';

import { config } from '@src/config';
import { AppModule } from '@src/app.module';
import { ValidationPipe } from '@nestjs/common';
import inversify from '@src/inversify/investify';
import { NestLogger } from '@presentation/common/nestLogger';

async function bootstrap() {
  inversify.loggerService.log(
    'info',
    `Environnement selected: ${config.env.mode} on port ${config.env.port ?? 3000}`,
  );

  /* eslint-disable @typescript-eslint/no-var-requires */
  require('events').EventEmitter.defaultMaxListeners = 50;
  const app = await NestFactory.create(AppModule, {
    logger: new NestLogger(),
  });
  app.use(bodyParser.json({ limit: '50KB' }));
  app.use(bodyParser.urlencoded({ limit: '50KB', extended: true }));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.append('Access-Control-Expose-Headers', '*');
    next();
  });
  await app.listen(config.env.port ?? 3000);
}
bootstrap();
