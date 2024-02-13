import { FunctionComponent, PropsWithChildren } from "react";

const TaskCard: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-lg bg-white shadow-sm border-gray-500">
      {children}
    </div>
  );
};

export default TaskCard;
