import { Module } from '@nestjs/common';

import { HelloResolver } from '@presentation/hello/hello.resolver';

@Module({
  imports: [],
  providers: [HelloResolver],
})
export class HelloModule {}
