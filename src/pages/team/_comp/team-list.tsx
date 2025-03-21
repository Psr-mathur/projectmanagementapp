import { api } from '@/utils/api'
import { type User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'
import { EditUser } from './edit-user';
import { AddUser } from './add-user';

export function TeamList() {
  const { data: session } = useSession();
  const { data: users, isLoading } = api.user.getAllUsers.useQuery(undefined, {
    enabled: session !== null
  });

  return (
    <div className='w-full'>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                Sr No
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? <div className='h-96 w-full flex justify-center'>
                <span className="loading loading-infinity loading-xl"></span>
              </div>
                :
                users?.map((user, index) => (
                  <UserRow key={user.id} srNo={index + 1} user={user} />
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

type UserRowProps = {
  srNo: number,
  user: User
}
function UserRow({ srNo, user }: UserRowProps) {
  return (
    <tr>
      <th>
        {srNo}
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <Image
                src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                alt="Avatar Tailwind CSS Component"
                width={94}
                height={94}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm opacity-50">Gurgaon,India</div>
          </div>
        </div>
      </td>
      <td>
        {user.email}
      </td>
      <td>
        {user.password}
      </td>
      <th>
        <EditUser data={user} />
      </th>
    </tr>
  )
}
