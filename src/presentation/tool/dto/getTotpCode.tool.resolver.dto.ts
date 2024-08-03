import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetTotpCodeToolResolverDto {
  @Field(() => String)
  secret: string;
}
