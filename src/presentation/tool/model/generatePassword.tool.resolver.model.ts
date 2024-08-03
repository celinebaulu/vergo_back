import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GeneratePasswordModelResolver {
  @Field(() => String)
  password: string;
}
