import { Task } from "@/types/models/task";
import { FunctionComponent } from "react";
import TodoTask from "./Todo";

interface TaskSectionProps {
  title: string;
  tasks: Partial<Task>[];
}

const TaskSection: FunctionComponent<TaskSectionProps> = ({ tasks, title }) => {
  return (
    <div className="w-[400px]">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex flex-col gap-5 mt-5">
        {tasks?.map((task) => (
          <TodoTask key={task.id} data={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskSection;