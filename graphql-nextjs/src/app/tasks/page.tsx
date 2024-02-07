"use client";

import { gql, useQuery } from "@apollo/client";
import { json } from "stream/consumers";

export default function TasksPage() {
  const GET_TASKS = gql`
    query {
      tasks {
        title
        description
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <pre>{JSON.stringify(data.tasks, null, 2)}</pre>;
}
