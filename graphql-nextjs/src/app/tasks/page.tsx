"use client";

import AddTaskModal, { AddTaskModalRef } from "@/components/task/AddEditTask";
import TaskSection from "@/components/task/TaskSection";
import { useGetTasks } from "@/hooks/task";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMemo, useRef } from "react";

export default function TasksPage() {
  const addTaskModalRef = useRef<AddTaskModalRef>(null);
  const { loading, error, data } = useGetTasks({
    fields: ["id", "title", "description", "status"],
  });

  const todoTasks = useMemo(
    () => data?.tasks.filter((task) => task.status === "TODO") || [],
    [data?.tasks]
  );

  const inProgressTasks = useMemo(
    () => data?.tasks.filter((task) => task.status === "IN_PROGRESS") || [],
    [data?.tasks]
  );

  const doneTasks = useMemo(
    () => data?.tasks.filter((task) => task.status === "DONE") || [],
    [data?.tasks]
  );

  const openAddTaskModal = () => {
    addTaskModalRef.current?.open();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button
          onClick={openAddTaskModal}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Task
        </button>
      </div>
      <div className="flex cursor-pointer gap-5">
        <TaskSection title="To do" tasks={todoTasks} />
        <TaskSection title="In Progress" tasks={inProgressTasks} />
        <TaskSection title="Done" tasks={doneTasks} />
      </div>
      <AddTaskModal ref={addTaskModalRef} />
    </div>
  );
}
