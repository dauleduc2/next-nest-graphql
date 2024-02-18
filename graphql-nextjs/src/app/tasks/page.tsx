"use client";

import AddEditTaskModal, {
  AddEditTaskModalMode,
  AddEditTaskModalRef,
} from "@/components/task/AddEditTask";
import TaskSection from "@/components/task/TaskSection";
import TodoTask from "@/components/task/Todo";
import {
  DRAGGABLE_SECTIONS,
  TASK_SECTIONS_CONFIG,
} from "@/constants/draggable";
import { useGetTasks, useUpdateTask } from "@/hooks/task";
import { Task, TaskSectionConfig } from "@/types/models/task";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMemo, useRef, useState } from "react";

export default function TasksPage() {
  const addTaskModalRef = useRef<AddEditTaskModalRef>(null);
  const [modalMode, setModalMode] = useState<AddEditTaskModalMode>("ADD");
  const [editingId, setEditingId] = useState<string | undefined>();
  const { loading, error, data, refetch } = useGetTasks({
    fields: ["id", "title", "description", "status", "date", "time"],
  });

  const [updateTask] = useUpdateTask();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, distance: 10 },
    })
  );

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
    setModalMode("ADD");
    addTaskModalRef.current?.open();
  };

  const openEditTaskModal = (id: string) => {
    setModalMode("EDIT");
    setEditingId(id);
    addTaskModalRef.current?.open();
  };

  const onDragEnd = async (e: DragEndEvent) => {
    const dragItem = e.active.data.current as Task;
    let dragSection = e.over?.data.current as TaskSectionConfig;

    if (dragItem.status === dragSection.status) return;

    await updateTask({
      variables: {
        ...dragItem,
        status: dragSection.status,
      },
    });

    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="flex flex-col gap-5 flex-1">
      <div className="flex justify-end">
        <button
          onClick={openAddTaskModal}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Task
        </button>
      </div>
      <DndContext onDragEnd={onDragEnd} sensors={sensors}>
        <div className="flex cursor-pointer gap-5 flex-1 ">
          <TaskSection data={TASK_SECTIONS_CONFIG.TODO}>
            {todoTasks?.map((task) => (
              <TodoTask key={task.id} data={task} onEdit={openEditTaskModal} />
            ))}
          </TaskSection>
          <TaskSection data={TASK_SECTIONS_CONFIG.IN_PROGRESS}>
            {inProgressTasks?.map((task) => (
              <TodoTask key={task.id} data={task} onEdit={openEditTaskModal} />
            ))}
          </TaskSection>
          <TaskSection data={TASK_SECTIONS_CONFIG.DONE}>
            {doneTasks?.map((task) => (
              <TodoTask key={task.id} data={task} onEdit={openEditTaskModal} />
            ))}
          </TaskSection>
        </div>
      </DndContext>
      <AddEditTaskModal
        id={editingId}
        mode={modalMode}
        ref={addTaskModalRef}
        onSuccess={refetch}
      />
    </div>
  );
}
