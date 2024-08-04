import { Module } from '@nestjs/common';

import { ImageController } from '@presentation/image/image.controller';
import inversify from '@src/inversify/investify';

@Module({
  controllers: [ImageController],
  providers: [
    {
      useValue: inversify,
      provide: 'Inversify',
    },
  ],
})
export class ImageModule {}
