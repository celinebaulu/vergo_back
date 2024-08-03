import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Inversify } from '@src/inversify/investify';
import { USER_ROLE } from '@presentation/guard/userRole';
import { Roles } from '@presentation/guard/roles.decorator';
import { RolesGuard } from '@presentation/guard/roles.guard';
import { GqlAuthGuard } from '@presentation/guard/auth.guard';
import { UserModelResolver } from '@presentation/user/model/user.resolver.model';
import { GetUserResolverDto } from '@presentation/user/dto/get.user.resolver.dto';
import { CreateUserResolverDto } from '@presentation/user/dto/create.user.resolver.dto';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => UserModelResolver)
export class UserResolver {
  constructor(
    @Inject('Inversify')
    private inversify: Inversify,
  ) {}

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => [UserModelResolver])
  async users(): Promise<UserModelResolver[]> {
    return this.inversify.getAllUserUsecase.execute();
  }

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Query((returns) => UserModelResolver)
  async user(@Args('dto') dto: GetUserResolverDto): Promise<UserModelResolver> {
    return this.inversify.getUserUsecase.execute(dto);
  }

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  @Mutation((returns) => UserModelResolver)
  async create_user(
    @Args('dto') dto: CreateUserResolverDto,
  ): Promise<UserModelResolver> {
    return this.inversify.createUserUsecase.execute(dto);
  }
}
