import { Task } from "../models/task";

export type TaskKey = keyof Task;

export type GetTaskWithKey<T extends TaskKey[]> = {
  tasks: Pick<Task, T[number]>[];
};
