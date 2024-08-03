import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { ToolResolver } from '@presentation/tool/tool.resolver';

@Module({
  imports: [],
  providers: [
    ToolResolver,
    {
      useValue: inversify,
      provide: 'Inversify',
    },
  ],
})
export class ToolModule {}
