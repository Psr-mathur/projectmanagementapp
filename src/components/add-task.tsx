import React, { useState } from 'react'
import { Button } from './ui/button';
import { Modal, ModalContent, ModalFooter, ModalHeader } from './ui/modal';
import { TaskForm } from './task-form';
import { api } from '@/utils/api';

export function AddTask() {
  const [isOpen, setIsOpen] = useState(false);

  const addTaskMutation = api.task.createTask.useMutation();

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Add Task
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader className='bg-base-100' title="Example Modal" />
        <ModalContent className='bg-base-200'>
          <TaskForm
            handleSubmit={async (data) => {
              await addTaskMutation.mutateAsync(data);
              setIsOpen(false);
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
