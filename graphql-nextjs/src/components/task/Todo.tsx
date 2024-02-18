import { Task } from "@/types/models/task";
import { FC } from "react";
import TaskCard from "./TaskCard";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useDraggable } from "@dnd-kit/core";
interface TodoTaskProps {
  data: Partial<Task>;
  onEdit?(id?: string): void;
}

const TodoTask: FC<TodoTaskProps> = ({ data, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id ?? "",
    data: data,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      className="rounded-lg bg-white shadow-sm border-gray-500 p-3 flex flex-col gap-3 z-10"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex justify-between items-center  w-full">
        <h2 className="font-semibold text-lg">{data.title}</h2>
        <div className="w-6 h-6" onClick={() => onEdit?.(data.id)}>
          <PencilSquareIcon />
        </div>
      </div>
      <div className=" text-gray-600 text-base">{data.description}</div>
    </div>
  );
};

export default TodoTask;
