import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { TrainingResolver } from '@presentation/Training/Training.resolver';

@Module({
  imports: [],
  providers: [
    TrainingResolver,
    {
      useValue: inversify,
      provide: 'Inversify',
    },
  ],
})
export class TrainingModule {}
