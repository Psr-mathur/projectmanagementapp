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
    <div className='btn btn-primary'>Task</div>
  )
}