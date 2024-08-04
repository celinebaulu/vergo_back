import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '@presentation/guard/gql.auth.guard';
import { HelloModelResolver } from '@presentation/hello/model/hello.resolver.model';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => HelloModelResolver)
export class HelloResolver {
  @UseGuards(GqlAuthGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => HelloModelResolver)
  async hello(): Promise<HelloModelResolver> {
    return {
      message: 'Hello World',
    };
  }
}
