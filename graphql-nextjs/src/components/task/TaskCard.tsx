import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";

type TaskCardProps = PropsWithChildren & HTMLAttributes<HTMLDivElement> & {};

const TaskCard: FunctionComponent<TaskCardProps> = ({ children, ...rest }) => {
  return (
    <div {...rest} className="rounded-lg bg-white shadow-sm border-gray-500">
      {children}
    </div>
  );
};

export default TaskCard;
