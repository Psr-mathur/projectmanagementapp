import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader } from '@/components/ui/modal';
import { TaskForm } from './task-form';
import { api } from '@/utils/api';
import { type Tags, type User, type Task } from '@prisma/client';
import { Edit2Icon } from 'lucide-react';
type Props = {
  data: Task & {
    assignedToUser?: User | null,
    createdByUser?: User | null,
    tags: Tags[]
  }
}
export function EditTask({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const updateTaskMutation = api.task.updateTask.useMutation();
  const trpcContext = api.useContext();

  return (
    <div>
      <button className="btn btn-ghost btn-xs" onClick={() => setIsOpen(true)}>
        <Edit2Icon />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader className='bg-base-100' title="Edit Task" />
        <ModalContent className='bg-base-200'>
          <TaskForm
            handleSubmit={async (data) => {
              await updateTaskMutation.mutateAsync(data, {
                onSuccess: () => {
                  trpcContext.task.getAllTasks.invalidate().catch((error) => console.error(error));
                }
              });
              setIsOpen(false);
            }}
            data={{
              title: data.title,
              description: data.description ?? undefined,
              status: data.status,
              priority: data.priority,
              dueDate: data.dueDate,
              tags: data.tags,
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
