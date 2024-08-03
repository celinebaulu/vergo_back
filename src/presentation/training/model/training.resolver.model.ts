import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SetModelResolver {
  @Field(() => Number, { nullable: true })
  rep?: number;
  @Field(() => [String], { nullable: true })
  series?: string[];
  @Field(() => Number, { nullable: true })
  duration?: number;
  @Field(() => Number, { nullable: true })
  rest?: number;
  @Field(() => Number, { nullable: true })
  pause?: number;
  @Field(() => [SetModelResolver], { nullable: true })
  sets?: SetModelResolver[];
}

@ObjectType()
export class WorkoutModelResolver {
  @Field(() => String)
  label: string;
  @Field(() => [SetModelResolver])
  sets: SetModelResolver[];
}

@ObjectType()
export class TrainingModelResolver {
  @Field(() => String)
  id: string;
  @Field(() => String)
  label: string;
  @Field(() => [WorkoutModelResolver])
  workout: WorkoutModelResolver[];
}