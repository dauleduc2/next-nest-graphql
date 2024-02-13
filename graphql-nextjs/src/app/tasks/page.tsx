"use client";

import { useGetTasks } from "@/hooks/task";

export default function TasksPage() {
  const { loading, error, data } = useGetTasks({
    fields: ["id", "title", "description", "status"],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <pre>{JSON.stringify(data?.tasks[0].description, null, 2)}</pre>;
}
