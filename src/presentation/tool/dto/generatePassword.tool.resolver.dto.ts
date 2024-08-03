import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GeneratePasswordResolverDto {
  @Field(() => Int)
  length: number;
  @Field(() => Boolean, { nullable: true, defaultValue: true })
  specials: boolean;
}
