import Image from "next/image";
import { Dropdown } from './ui/dropdown';
import { type TaskStatus, type Tags, type Task, type User } from '@prisma/client';
import { api } from '@/utils/api';
import { EditTask } from './edit-task';

type TaskCardProps = {
  task: Task & {
    assignedToUser?: User | null,
    createdByUser?: User | null,
    tags: Tags[]
  };
  onStatusChange: (id: string, status: string) => void; // Update task status handler
};

const getProgress = (status: Task['status']) => {
  switch (status) {
    case 'TODO':
      return 0;
    case 'IN_PROGRESS':
      return 50;
    case 'COMPLETED':
      return 100;
    default:
      return 0;
  }
}

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case "TODO":
      return "badge-neutral";
    case "IN_PROGRESS":
      return "badge-info";
    case "COMPLETED":
      return "badge-success";
    default:
      return "badge-neutral";
  }
};

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "HIGH":
      return "badge-error";
    case "MEDIUM":
      return "badge-warning";
    case "LOW":
      return "badge-success";
    default:
      return "badge-neutral";
  }
};

export function TaskCard({ task, onStatusChange }: TaskCardProps) {

  const updateTaskMutation = api.task.updateTask.useMutation();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value);
    updateTaskMutation.mutate({
      id: task.id,
      status: e.target.value as TaskStatus
    });
  };

  return (
    <div className="card bg-base-100 shadow-md border-rose-50 border-2">
      {/* Card Header */}
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title">{task.title}</h2>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <Dropdown
              value={task.status}
              onChange={handleStatusChange}
              options={[
                { label: "To Do", value: "TODO" },
                { label: "In Progress", value: "IN_PROGRESS" },
                { label: "Completed", value: "COMPLETED" },
              ] satisfies { label: string, value: Task['status'] }[]}
              disabled={updateTaskMutation.isPending}
            />
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm">
                ⋮
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
              >
                <li>
                  <EditTask
                    data={task}
                  />
                </li>
                <li>
                  <a className="text-red-500">Delete</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Description */}
        <p className="text-sm text-base-content mt-2">{task.description}</p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className={`badge ${getStatusColor(task.status)}`}>{task.status}</span>
          <span className={`badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
          {task.tags.map((tag) => (
            <span key={tag.name} className="badge badge-secondary">
              {tag.name}
            </span>
          ))}
        </div>
        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{getProgress(task.status)}%</span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={getProgress(task.status)}
            max="100"
          />
        </div>
      </div>
      {/* Card Footer */}
      <div className="card-footer flex justify-between items-center p-4 text-sm text-base-content">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m0 0H5m3 0h3m7 13h3m-3 0v-4m0 4h-3m3 0a9 9 0 11-6-8.485M16.5 9h.01M12.5 9h.01M8.5 9h.01"
            />
          </svg>
          Due: {task.dueDate.toLocaleDateString("en-US", {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
        <div className="flex items-center gap-2">
          <span>Assigned to:</span>
          <div className="avatar">
            <div className="w-8 rounded-full">
              <Image
                src={task.assignedToUser?.avatar ?? "/placeholder-user.jpg"}
                alt={task.assignedToUser?.name ?? "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}