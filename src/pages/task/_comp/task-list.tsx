import { TaskCard } from "./task-card";
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { AddTask } from './add-task';
import { useSearchParams } from 'next/navigation';
import { type TaskPriority, type TaskStatus } from '@prisma/client';

export function TaskList() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const filters = {
    searchQuery: searchParams.get("searchQuery") ?? "",
    status: (searchParams.get("status") as TaskStatus) ?? "TODO",
    priority: (searchParams.get("priority") as TaskPriority) ?? "MEDIUM",
    tagsIds: searchParams.get("tags")?.split(",") ?? [],
  }
  const { data: tasks, isLoading, refetch } = api.task.getAllCreatedTasks.useQuery({
    status: filters.status,
    priority: filters.priority,
    tags: filters.tagsIds.map((id) => ({ id: id }))
  }, {
    enabled: session !== null,
  });

  const handleStatusChange = async (id: string, status: string) => {
    await refetch();
  };

  return (
    <div className="space-y-4">
      <div className='w-full flex justify-end'>
        <AddTask />
      </div>
      {isLoading ? <div className='h-96 w-full flex justify-center'>
        <span className="loading loading-infinity loading-xl"></span>
      </div> : tasks?.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}