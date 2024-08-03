import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserResolverDto {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => String, { nullable: true })
  code?: string;
}
