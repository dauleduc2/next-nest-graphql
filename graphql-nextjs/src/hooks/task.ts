import {
  AddEditTaskForm,
  AddTaskPayload,
  EditTaskPayload,
} from "@/types/request/task";
import {
  GetTaskWithKey,
  GetTasksWithKey,
  TaskKey,
} from "@/types/response/task";
import { gql, useMutation, useQuery } from "@apollo/client";

interface GetTasksParams<T extends TaskKey[]> {
  readonly fields: T;
}

interface GetTaskByIdParams<T extends TaskKey[]> {
  readonly fields: T;
  readonly id?: string;
}

export const useGetTasks = <T extends TaskKey[]>({
  fields,
}: GetTasksParams<T>) => {
  const GET_TASKS = gql`
    query {
      tasks {
        ${fields.join(" ")}
      }
    }
  `;
  return useQuery<GetTasksWithKey<T>>(GET_TASKS);
};

export const useCreateTask = () => {
  const CREATE_TASK = gql`
    mutation createTask(
      $title: String!
      $description: String!
      $date: DateTime!
      $time: Float!
      $status: String!
    ) {
      createTask(
        createTaskInput: {
          title: $title
          description: $description
          date: $date
          time: $time
          status: $status
        }
      ) {
        title
        description
        date
        time
        status
      }
    }
  `;
  return useMutation<any, AddTaskPayload>(CREATE_TASK);
};

export const useGetTaskById = <T extends TaskKey[]>({
  fields,
  id,
}: GetTaskByIdParams<T>) => {
  const GET_TASKS = gql`
    query getTaskById($id: String!) {
      task(id: $id) {
        ${fields.join(" ")}
      }
    }
  `;

  return useQuery<GetTaskWithKey<T>>(GET_TASKS, {
    variables: { id },
    skip: !id,
  });
};

export const useUpdateTask = () => {
  const UPDATE_TASK = gql`
    mutation updateTask(
      $id: String!
      $title: String!
      $description: String!
      $date: DateTime!
      $time: Float!
      $status: String!
    ) {
      updateTask(
        updateTaskInput: {
          id: $id
          title: $title
          description: $description
          date: $date
          time: $time
          status: $status
        }
      ) {
        title
        description
        date
        time
        status
      }
    }
  `;
  return useMutation<any, EditTaskPayload>(UPDATE_TASK);
};
