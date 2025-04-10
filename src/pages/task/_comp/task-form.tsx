import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { MultiselectAutocomplete } from '@/components/ui/autocomplete';
import { type TTaskUpdate, type TTaskCreate } from '@/models/task.model';
import { type Tags, type User, type Task, type TaskPriority, type TaskStatus } from '@prisma/client';
import { type TTagCreate } from '@/models/tags.model';
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  handleSubmit?: (formState: TTaskUpdate) => Promise<void>
  data?: Task & {
    assignedToUser?: User | null,
    createdByUser?: User | null,
    tags: Tags[]
  }
}
export function TaskForm({ handleSubmit, data }: Props) {
  const { data: session } = useSession()
  const tagCreateMutation = api.tag.createTag.useMutation();
  const { data: tags, refetch: refetchTags } = api.tag.getAllTags.useQuery(undefined, {
    enabled: session !== null,
  });

  const { data: users, refetch: refetchUsers } = api.user.getAllUsers.useQuery(undefined, {
    enabled: session !== null
  })

  const [formState, setFormState] = useState<TTaskUpdate>({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    tags: [],
    dueDate: new Date(),
    assignedToUserId: ""
  });

  useEffect(() => {
    if (data)
      setFormState({
        id: data.id,
        title: data.title,
        description: data.description ?? undefined,
        status: data.status,
        priority: data.priority,
        tags: data.tags ?? [],
        dueDate: data.dueDate,
        assignedToUserId: data.assignedToUserId ?? undefined,
      })
  }, [data])

  const handleAddTag = async (value: string) => {
    const newTag: TTagCreate = { name: value.trim() };
    try {
      await tagCreateMutation.mutateAsync(newTag);
      await refetchTags();
    } catch (error) {
      console.error(error);
    }
  };


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleSubmit) {
      await handleSubmit(formState);
      await refetchTags();
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <div className="card-body">
        <form onSubmit={onSubmit} className='space-y-2'>
          {/* Task Title */}
          <Input
            label="Title"
            value={formState.title}
            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
            placeholder="Enter task title"
            required
          />

          {/* Task Description */}
          <Textarea
            label="Description"
            value={formState.description}
            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            placeholder="Enter task description"
            required
          />

          {/* Status Dropdown */}
          <Dropdown
            label="Status"
            options={[
              { label: "To Do", value: "TODO" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Completed", value: "COMPLETED" },
            ] satisfies { label: string; value: TaskStatus }[]}
            value={formState.status}
            onChange={(e) => setFormState({ ...formState, status: e.target.value as TaskStatus })}
            required
          />

          {/* Priority Dropdown */}
          <Dropdown
            label="Priority"
            options={[
              { label: "Low", value: "LOW" },
              { label: "Medium", value: "MEDIUM" },
              { label: "High", value: "HIGH" },
            ] satisfies { label: string; value: TaskPriority }[]}
            value={formState.priority}
            onChange={(e) => setFormState({ ...formState, priority: e.target.value as TaskPriority })}
            required
          />

          <MultiselectAutocomplete
            label='Tags'
            options={tags?.map((tag) => ({ label: tag.name, value: tag.id })) ?? []}
            placeholder="Select tags..."
            selectedValues={formState.tags?.map((tag) => ({ label: tag.name, value: tag.id }))}
            onSelectionChange={(newTags) => setFormState({ ...formState, tags: newTags.map((newTag) => ({ name: newTag.label, id: newTag.value })) })}
            handleNewOption={handleAddTag}
          />

          {/* Due Date */}
          <Input
            label="Due Date"
            type="date"
            value={formState.dueDate?.toISOString().split("T")[0]}
            onChange={(e) => setFormState({ ...formState, dueDate: new Date(e.target.value) })}
          />

          {/* Assigned To */}
          <Dropdown
            label="Assigned To"
            options={users?.filter(d => d.id !== session?.user?.id).map((user) => ({ label: user.email, value: user.id })) ?? []}
            value={formState.assignedToUserId}
            onChange={(e) => setFormState({ ...formState, assignedToUserId: e.target.value })}
          />

          {/* Submit Button */}
          <Button variant="primary" type='submit'>
            Submit Task
          </Button>
        </form>
      </div>
    </div>
  );
}