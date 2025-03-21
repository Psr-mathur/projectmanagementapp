import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader } from '@/components/ui/modal';
import { api } from '@/utils/api';
import { type User, } from '@prisma/client';
import { UserForm } from './user-form';
import { Edit2Icon } from 'lucide-react';
type Props = {
  data: User
}
export function EditUser({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const updateTaskMutation = api.task.updateTask.useMutation();
  const trpcContext = api.useContext();

  return (
    <div>
      <button className="btn btn-ghost btn-xs" onClick={() => setIsOpen(true)}>
        <Edit2Icon />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader className='bg-base-100' title="Edit User" />
        <ModalContent className='bg-base-200'>
          <UserForm
            handleSubmit={async (d) => {
              await updateTaskMutation.mutateAsync({
                id: data.id,
                ...d
              }, {
                onSuccess: () => {
                  trpcContext.user.getAllUsers.invalidate().catch((error) => console.error(error));
                }
              });
              setIsOpen(false);
            }}
            data={{
              email: data.email,
              name: data.name ?? undefined,
              avatar: data.avatar ?? undefined,
              password: data.password,
            }}
          />
        </ModalContent>
        {/* <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => alert("Confirmed!")}>
            Confirm
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}
