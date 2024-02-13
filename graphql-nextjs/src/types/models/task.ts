import { BaseModel } from "./common";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = BaseModel & {
  title: string;
  description: string;
  status: TaskStatus;
  date: string;
  time: string;
};
