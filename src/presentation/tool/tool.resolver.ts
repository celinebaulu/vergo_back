import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver('ToolResolver')
export class ToolResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}
}
