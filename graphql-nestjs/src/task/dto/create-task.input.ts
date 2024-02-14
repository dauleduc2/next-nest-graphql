import { InputType, Field } from '@nestjs/graphql';
import { TaskStatus } from '../entities/task.entity';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  date: Date;

  @Field()
  time: number;

  @Field()
  status: TaskStatus;
}
