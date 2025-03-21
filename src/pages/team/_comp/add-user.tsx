import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalHeader } from '@/components/ui/modal';
import { api } from '@/utils/api';
import { UserForm } from './user-form';

export function AddUser() {
  const [isOpen, setIsOpen] = useState(false);

  const addUserMutation = api.user.createUser.useMutation();

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Add User
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader className='bg-base-100' title="Add User" />
        <ModalContent className='bg-base-200'>
          <UserForm
            handleSubmit={async (data) => {
              try {
                await addUserMutation.mutateAsync(data);
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
