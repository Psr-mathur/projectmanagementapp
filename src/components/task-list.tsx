import { useState } from "react";
import { TaskCard } from "./task-card";

export function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Homepage redesign",
      description: "Update the homepage with new branding and improve mobile responsiveness",
      status: "In Progress",
      priority: "High",
      dueDate: "Aug 15, 2023",
      progress: 65,
      assignee: {
        id: "2",
        name: "Sarah Smith",
        avatar: "/placeholder-user.jpg",
        initials: "SS",
      },
      tags: ["Design", "Frontend"],
    },
    {
      id: 2,
      title: "API integration",
      description: "Connect the application with the payment gateway API",
      status: "To Do",
      priority: "Medium",
      dueDate: "Aug 20, 2023",
      progress: 0,
      assignee: {
        id: "3",
        name: "Mike Johnson",
        avatar: "/placeholder-user.jpg",
        initials: "MJ",
      },
      tags: ["Backend", "Feature"],
    },
  ]);

  const handleStatusChange = (id: number, status: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status, progress: status === "Completed" ? 100 : 50 }
          : task
      )
    );
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}