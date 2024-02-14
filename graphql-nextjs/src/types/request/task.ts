import { Task, TaskStatus } from "../models/task";

export interface AddEditTaskForm
  extends Pick<Task, "title" | "description" | "status" | "date" | "time"> {}

export type AddTaskPayload = AddEditTaskForm;

export type EditTaskPayload = AddEditTaskForm & { id: string };
