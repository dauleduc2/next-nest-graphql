import { TaskSectionConfig } from "@/types/models/task";
import { useDroppable } from "@dnd-kit/core";
import { InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FunctionComponent, PropsWithChildren } from "react";

interface TaskSectionProps extends PropsWithChildren {
  data: TaskSectionConfig;
}

const TaskSection: FunctionComponent<TaskSectionProps> = ({
  data,
  children,
}) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: data.sectionId,
    data: data,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "w-[400px] flex-1 p-3 relative",
        isOver ? "border border-dashed border-green-500 border-" : ""
      )}
    >
      <h1 className="text-xl font-bold">{data.title}</h1>
      <div className="flex flex-col gap-5 mt-5">{children}</div>
      {active && (
        <div className="absolute inset-0 bg-gray-200 opacity-50 flex flex-col justify-center items-center">
          <InboxArrowDownIcon className="h-10 w-10 text-green-500" />
          <p className="text-base ">Drop here</p>
        </div>
      )}
    </div>
  );
};

export default TaskSection;
