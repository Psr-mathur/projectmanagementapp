import Image from "next/image";
import { Dropdown } from './ui/dropdown';

type TaskCardProps = {
  task: {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    progress: number;
    assignee: {
      id: string;
      name: string;
      avatar: string;
      initials: string;
    };
    tags: string[];
  };
  onStatusChange: (id: number, status: string) => void; // Update task status handler
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "To Do":
      return "badge-neutral";
    case "In Progress":
      return "badge-info";
    case "Completed":
      return "badge-success";
    default:
      return "badge-neutral";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "badge-error";
    case "Medium":
      return "badge-warning";
    case "Low":
      return "badge-success";
    default:
      return "badge-neutral";
  }
};

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value);
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
                { label: "To Do", value: "To Do" },
                { label: "In Progress", value: "In Progress" },
                { label: "Completed", value: "Completed" },
              ]}
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
                  <a>Edit</a>
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
            <span key={tag} className="badge badge-secondary">
              {tag}
            </span>
          ))}
        </div>
        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <progress className="progress progress-primary w-full" value={task.progress} max="100"></progress>
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
          Due: {task.dueDate}
        </div>
        <div className="flex items-center gap-2">
          <span>Assigned to:</span>
          <div className="avatar">
            <div className="w-8 rounded-full">
              <Image
                src={task.assignee.avatar}
                alt={task.assignee.name}
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