import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Dropdown } from "./ui/dropdown";
import { Button } from "./ui/button";
import { MultiselectAutocomplete } from './ui/autocomplete';
import { type TTaskCreate } from '@/models/task.model';
import { type TaskPriority, type TaskStatus } from '@prisma/client';
import { type TTagCreate } from '@/models/tags.model';
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { Textarea } from './ui/textarea';

type Props = {
  handleSubmit?: (formState: TTaskCreate) => Promise<void>
  data?: TTaskCreate
}
export function TaskForm({ handleSubmit, data }: Props) {
  const { data: session } = useSession()
  const tagCreateMutation = api.tag.createTag.useMutation();
  const { data: tags, refetch: refetchTags } = api.tag.getAllTags.useQuery(undefined, {
    enabled: session !== null,
  });

  const [formState, setFormState] = useState<TTaskCreate>({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    tags: [],
    dueDate: new Date(),
  });

  useEffect(() => {
    if (data)
      setFormState(data)
  }, [data])

  const handleAddTag = async (value: string) => {
    const newTag: TTagCreate = { name: value.trim() };
    await tagCreateMutation.mutateAsync(newTag);
    await refetchTags();
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
            selectedValues={formState.tags.map((tag) => ({ label: tag.name, value: tag.id }))}
            onSelectionChange={(newTags) => setFormState({ ...formState, tags: newTags.map((newTag) => ({ name: newTag.value, id: newTag.value })) })}
            handleNewOption={handleAddTag}
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