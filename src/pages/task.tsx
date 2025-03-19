import { TaskFilters } from '@/components/task-filters';
import { TaskList } from '@/components/task-list';
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Task() {

  const { data: session } = useSession();
  const { data: tasks, isLoading } = api.task.getAllCreatedTasks.useQuery(undefined, {
    enabled: !!session
  });

  console.log(tasks);

  return (
    <div className='flex'>
      <div>
        <TaskFilters />
      </div>
      <div className='flex-1'>
        <TaskList />
      </div>
    </div>
  )
}