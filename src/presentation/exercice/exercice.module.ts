import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { ExerciceResolver } from '@presentation/exercice/exercice.resolver';

@Module({
  imports: [],
  providers: [
    ExerciceResolver,
    {
      useValue: inversify,
      provide: 'Inversify',
    },
  ],
})
export class ExerciceModule {}
