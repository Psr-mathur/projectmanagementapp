import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalHeader } from '@/components/ui/modal';
import { TaskForm } from './task-form';
import { api } from '@/utils/api';

export function AddTask() {
  const [isOpen, setIsOpen] = useState(false);

  const addTaskMutation = api.task.createTask.useMutation();
  const queryClient = api.useContext();

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Add Task
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader className='bg-base-100' title="Add Task" />
        <ModalContent className='bg-base-200'>
          <TaskForm
            handleSubmit={async (data) => {
              try {
                await addTaskMutation.mutateAsync(data, {
                  onSuccess: () => {
                    queryClient.task.getAllCreatedTasks.invalidate().catch((error) => console.error(error));
                  }
                });
              } catch (error) {
                console.error(error);
              } finally {
                setIsOpen(false);
              }
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
