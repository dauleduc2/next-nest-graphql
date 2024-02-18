import { TaskSections } from "@/types/models/task";

export const DRAGGABLE_SECTIONS = {
  TODO: "todo-draggable",
  IN_PROGRESS: "in-progress-draggable",
  DONE: "done-draggable",
};

export const TASK_SECTIONS_CONFIG: TaskSections = {
  DONE: {
    sectionId: DRAGGABLE_SECTIONS.DONE,
    title: "Done",
    status: "DONE",
  },
  IN_PROGRESS: {
    sectionId: DRAGGABLE_SECTIONS.IN_PROGRESS,
    title: "In Progress",
    status: "IN_PROGRESS",
  },
  TODO: {
    sectionId: DRAGGABLE_SECTIONS.TODO,
    title: "To do",
    status: "TODO",
  },
};
