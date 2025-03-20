import { XIcon } from 'lucide-react';
import React from "react";

// Modal Component
type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ isOpen, onClose, children, className, ...props }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}
      {...props}
      role="dialog"
      aria-modal="true"
    >
      <div className="rounded-lg shadow-lg w-full min-w-[596px] max-w-screen-md relative">
        {children}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}

// ModalHeader Component
type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

export function ModalHeader({ title, className, ...props }: ModalHeaderProps) {
  return (
    <div className={`p-4 border-b ${className}`} {...props}>
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  );
}

// ModalContent Component
type ModalContentProps = React.HTMLAttributes<HTMLDivElement>;

export function ModalContent({ children, className, ...props }: ModalContentProps) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

// ModalFooter Component
type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function ModalFooter({ children, className, ...props }: ModalFooterProps) {
  return (
    <div className={`p-4 border-t flex justify-end space-x-2 ${className}`} {...props}>
      {children}
    </div>
  );
}