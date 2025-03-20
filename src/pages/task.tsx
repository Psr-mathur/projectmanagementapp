import { TaskFilters } from '@/components/task-filters';
import { TaskList } from '@/components/task-list';
import React from 'react'

export default function Task() {

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