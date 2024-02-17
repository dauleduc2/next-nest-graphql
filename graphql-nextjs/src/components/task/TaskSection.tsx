import { useDroppable } from "@dnd-kit/core";
import { FunctionComponent, PropsWithChildren } from "react";

interface TaskSectionProps extends PropsWithChildren {
  title: string;
  id: string;
}

const TaskSection: FunctionComponent<TaskSectionProps> = ({
  title,
  children,
  id,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  return (
    <div style={style} ref={setNodeRef} className="w-[400px] flex-1">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex flex-col gap-5 mt-5">{children}</div>
    </div>
  );
};

export default TaskSection;
