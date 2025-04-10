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
    status: (searchParams.get("status") as TaskStatus) ?? "",
    priority: ((searchParams.get("priority") && (searchParams.get("priority") === 'all')) ? "" : searchParams.get("priority")) as TaskPriority,
    tagsIds: searchParams.get("tags")?.split(",") ?? [],
  }
  const { data: tasks, isLoading, refetch } = api.task.getAllTasks.useQuery({
    searchQuery: filters.searchQuery,
    ...(filters.status && { status: filters.status }),
    ...(filters.priority && { priority: filters.priority }),
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
      <div className='h-[90vh] overflow-scroll' style={{
        scrollbarWidth: "none"
      }}>
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
    </div>
  );
}