import React from 'react'
import { TeamList } from './_comp/team-list'
import { AddUser } from './_comp/add-user'

export default function Account() {
  return (
    <div>
      <div className='w-full'>
        <div className='flex justify-end'>
          <AddUser />
        </div>
        <TeamList />
      </div>
    </div>
  )
}
