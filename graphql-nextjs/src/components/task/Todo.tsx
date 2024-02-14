import { Task } from "@/types/models/task";
import { FC } from "react";
import TaskCard from "./TaskCard";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
interface TodoTaskProps {
  data: Partial<Task>;
  onEdit?(id?: string): void;
}

const TodoTask: FC<TodoTaskProps> = ({ data, onEdit }) => {
  return (
    <TaskCard>
      <div className="flex justify-between items-center p-3 w-full">
        <h2 className="font-semibold text-lg">{data.title}</h2>
        <div className="w-6 h-6" onClick={() => onEdit?.(data.id)}>
          <PencilSquareIcon />
        </div>
      </div>
      <div className="p-3 text-gray-600 text-base">{data.description}</div>
    </TaskCard>
  );
};

export default TodoTask;
