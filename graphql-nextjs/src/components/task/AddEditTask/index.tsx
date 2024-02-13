import { forwardRef, useImperativeHandle } from "react";
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

export interface AddEditTaskForm {
  title: string;
  description: string;
  status: TaskStatus;
}

export type AddTaskModalProps = {};

export type AddTaskModalRef = {
  open(): void;
  close(): void;
};

const AddTaskModal = forwardRef<AddTaskModalRef, AddTaskModalProps>(
  (props, ref) => {
    const methods = useForm<AddEditTaskForm>({
      resolver: joiResolver(addEditTaskSchema),
    });

    const [open, setOpen] = useState(true);

    useImperativeHandle(ref, () => ({
      open() {
        setOpen(true);
      },
      close() {
        setOpen(false);
      },
    }));

    const onSubmit = (data: AddEditTaskForm) => {
      console.log(data);
    };

    const onCancel = () => {
      setOpen(false);
    };

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                        onClick={() => setOpen(false)}
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
                          <TextareaC label="Description" name="description" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={onCancel}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
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

AddTaskModal.displayName = "AddTaskModal";

export default AddTaskModal;
