import { GetTaskWithKey, TaskKey } from "@/types/response/task";
import { gql, useQuery } from "@apollo/client";

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
