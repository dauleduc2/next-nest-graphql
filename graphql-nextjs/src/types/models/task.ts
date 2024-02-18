import { BaseModel } from "./common";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = BaseModel & {
  title: string;
  description: string;
  status: TaskStatus;
  date: string;
  time: number;
};

export type TaskSectionConfig = {
  sectionId: string;
  title: string;
  status: TaskStatus;
};

export type TaskSections = {
  [key in TaskStatus]: TaskSectionConfig;
};
