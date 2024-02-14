import { AddEditTaskForm, AddTaskPayload } from "@/types/request/task";
import { GetTaskWithKey, TaskKey } from "@/types/response/task";
import { gql, useMutation, useQuery } from "@apollo/client";

interface GetTaskProps<T extends TaskKey[]> {
  readonly fields: T;
}

export const useGetTasks = <T extends TaskKey[]>({
  fields,
}: GetTaskProps<T>) => {
  const GET_TASKS = gql`
    query {
      tasks {
        ${fields.join(" ")}
      }
    }
  `;
  return useQuery<GetTaskWithKey<T>>(GET_TASKS);
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
  return useMutation<any, AddEditTaskForm>(CREATE_TASK);
};
