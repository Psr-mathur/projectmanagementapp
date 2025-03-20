import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from './ui/input';
import { Radio } from './ui/radio';
import { Dropdown } from './ui/dropdown';
import { CheckboxGroup } from './ui/checkbox';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { api } from '@/utils/api';
import { type TaskPriority, type TaskStatus } from '@prisma/client';

type TFilter = {
  searchQuery: string;
  status: TaskStatus;
  priority: TaskPriority;
  tagsIds: string[];
};

export function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterState, setFilterState] = useState<TFilter>({
    searchQuery: searchParams.get("searchQuery") ?? "",
    status: (searchParams.get("status") as TaskStatus) ?? "TODO",
    priority: (searchParams.get("priority") as TaskPriority) ?? "MEDIUM",
    tagsIds: searchParams.get("tags")?.split(",") ?? [],
  });

  console.log(filterState);

  const { data: session } = useSession();
  const { data: tags, isLoading } = api.tag.getAllTags.useQuery(undefined, {
    enabled: session !== null,
  });

  // Apply filters by updating URL params
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filterState.searchQuery) params.set("searchQuery", filterState.searchQuery);
    if (filterState.status) params.set("status", filterState.status);
    if (filterState.priority) params.set("priority", filterState.priority);
    if (filterState.tagsIds.length > 0) params.set("tags", filterState.tagsIds.join(","));

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <div className="card-body space-y-4">
        <h2 className="card-title">Filters</h2>

        <Input
          label="Search"
          value={filterState.searchQuery}
          onChange={(e) => setFilterState({ ...filterState, searchQuery: e.target.value })}
        />

        {/* Status Selection (Radio Group) */}
        <Radio
          label="Status"
          options={[
            { label: "To Do", value: "TODO" },
            { label: "In Progress", value: "IN_PROGRESS" },
            { label: "Completed", value: "COMPLETED" },
          ] as { label: string; value: TaskStatus }[]}
          name="status"
          onChange={(e) => setFilterState({ ...filterState, status: e.target.value as TaskStatus })}
          selectedValue={filterState.status}
        />

        {/* Priority Dropdown */}
        <Dropdown
          label="Priority"
          options={[
            { label: "High", value: "HIGH" },
            { label: "Medium", value: "MEDIUM" },
            { label: "Low", value: "LOW" },
          ]}
          value={filterState.priority}
          onChange={(e) => setFilterState({ ...filterState, priority: e.target.value as TaskPriority })}
        />

        {/* Tags (Checkboxes) */}
        <CheckboxGroup
          label="Tags"
          options={tags?.map((tag) => ({ label: tag.name, value: tag.id })) ?? []}
          selectedValues={filterState.tagsIds}
          onChange={(value) => {
            setFilterState({ ...filterState, tagsIds: [...filterState.tagsIds, value.toString()] });
          }}
        />

        {/* Apply Filters Button */}
        <Button variant="primary" onClick={applyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}
