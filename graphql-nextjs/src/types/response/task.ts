import { Task } from "../models/task";

export type TaskKey = keyof Task;

export type GetTasksWithKey<T extends TaskKey[]> = {
  tasks: Pick<Task, T[number]>[];
};

export type GetTaskWithKey<T extends TaskKey[]> = {
  task: Pick<Task, T[number]>;
};
