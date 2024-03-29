import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TextFieldC from "../../form/textfield";
import TextareaC from "../../form/textarea";
import SelectC, { SelectOption } from "../../form/select";
import { TaskStatus } from "@/types/models/task";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { addEditTaskSchema } from "./schema";
import { useCreateTask, useGetTaskById, useUpdateTask } from "@/hooks/task";
import { AddEditTaskForm } from "@/types/request/task";
import DateField from "@/components/form/date";
import { toast } from "react-toastify";
import ButtonC from "@/components/Button";

export type AddEditTaskModalMode = "ADD" | "EDIT";

export type AddEditTaskModalProps = {
  onSuccess?(): void;
  mode: AddEditTaskModalMode;
  id?: string;
};

export type AddEditTaskModalRef = {
  open(): void;
  close(): void;
};

const AddEditTaskModal = forwardRef<AddEditTaskModalRef, AddEditTaskModalProps>(
  ({ onSuccess, mode, id }, ref) => {
    const isAddMode = mode === "ADD";
    const { data: taskRes, loading: isGetTaskLoading } = useGetTaskById({
      fields: ["id", "title", "description", "date", "time", "status"],
      id,
    });
    const methods = useForm<AddEditTaskForm>({
      resolver: joiResolver(addEditTaskSchema),
    });
    const [addTask, { loading: isCreatingTask }] = useCreateTask();
    const [updateTask, { loading: isUpdatingTask }] = useUpdateTask();
    const [open, setOpen] = useState(false);
    const isLoading = isCreatingTask || isUpdatingTask || isGetTaskLoading;
    useImperativeHandle(ref, () => ({
      open() {
        setOpen(true);
      },
      close() {
        setOpen(false);
      },
    }));

    const onAddTask = async (data: AddEditTaskForm) => {
      const res = await addTask({
        variables: data,
      });

      if (res.errors) {
        toast.error(res.errors[0].message);
        return;
      }

      toast.success("Task added successfully");
    };

    const onEditTask = async (data: AddEditTaskForm) => {
      if (!id) return;

      const res = await updateTask({
        variables: {
          id: id,
          ...data,
        },
      });

      if (res.errors) {
        toast.error(res.errors[0].message);
        return;
      }

      toast.success("Task update successfully");
    };

    const onSubmit = async (data: AddEditTaskForm) => {
      if (isAddMode) await onAddTask(data);
      else await onEditTask(data);

      clearAndCloseForm();
      onSuccess?.();
    };

    const clearAndCloseForm = () => {
      setOpen(false);
      setTimeout(() => {
        methods.reset();
      }, 500);
    };

    useEffect(() => {
      if (open && !isAddMode && taskRes?.task) {
        methods.setValue("title", taskRes.task.title);
        methods.setValue("description", taskRes.task.description);
        methods.setValue(
          "date",
          new Date(taskRes.task.date).toISOString().split("T")[0]
        );
        methods.setValue("time", taskRes.task.time);
        methods.setValue("status", taskRes.task.status);
      }
    }, [isAddMode, methods, open, taskRes]);

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={clearAndCloseForm}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="fixed inset-0 z-10 w-screen overflow-y-auto"
            >
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="flex flex-col relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={clearAndCloseForm}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex items-start w-full flex-1">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex flex-col w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add new task
                        </Dialog.Title>

                        <div className="mt-2 flex flex-col gap-5 flex-1">
                          <div className="flex gap-5 justify-between items-center">
                            <div className="flex-1">
                              <TextFieldC label="Title" name="title" />
                            </div>
                            <div className="flex-1">
                              <SelectC
                                label="Status"
                                name="status"
                                options={
                                  [
                                    {
                                      label: "Select status",
                                      value: "",
                                    },
                                    {
                                      label: "To do",
                                      value: "TODO",
                                    },
                                    {
                                      label: "In Progress",
                                      value: "IN_PROGRESS",
                                    },
                                    {
                                      label: "Done",
                                      value: "DONE",
                                    },
                                  ] satisfies SelectOption<TaskStatus | "">[]
                                }
                              />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex-1">
                              <DateField label="Due date" name="date" />
                            </div>
                            <TextFieldC
                              type="number"
                              label="Time (hours)"
                              name="time"
                            />
                          </div>
                          <TextareaC label="Description" name="description" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <ButtonC isLoading={isLoading} type="submit">
                        Submit
                      </ButtonC>
                      <ButtonC
                        type="button"
                        onClick={clearAndCloseForm}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </ButtonC>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </form>
          </FormProvider>
        </Dialog>
      </Transition.Root>
    );
  }
);

AddEditTaskModal.displayName = "AddEditTaskModal";

export default AddEditTaskModal;
