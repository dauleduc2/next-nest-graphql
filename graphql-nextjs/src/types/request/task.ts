import { TaskStatus } from "../models/task";

export interface AddEditTaskForm {
  title: string;
  description: string;
  status: TaskStatus;
  date: string;
  time: number;
}

export interface AddTaskPayload {
  createTaskInput: AddEditTaskForm;
}
