import { useEffect, useMemo, useState } from "react";
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
  const searchQuery = searchParams.get("searchQuery") ?? ""
  const status = (searchParams.get("status") as TaskStatus) ?? "TODO"
  const priority = (searchParams.get("priority") as TaskPriority) ?? "MEDIUM"
  const tagsIds = useMemo(() => searchParams.get("tags")?.split(",") ?? [], [searchParams])
  const [filterState, setFilterState] = useState<TFilter>({
    searchQuery,
    status,
    priority,
    tagsIds
  });

  useEffect(() => {
    setFilterState({
      searchQuery,
      status,
      priority,
      tagsIds
    })
  }, [searchQuery, status, priority, tagsIds])

  const { data: session } = useSession();
  const { data: tags, isLoading } = api.tag.getAllTags.useQuery(undefined, {
    enabled: session !== null,
  });

  // Apply filters by updating URL params
  const applyFilters = () => {
    console.log(filterState);
    const params = new URLSearchParams();
    if (filterState.searchQuery) {
      params.set("searchQuery", filterState.searchQuery);
    } else {
      params.delete("searchQuery");
    }
    if (filterState.status) {
      params.set("status", filterState.status);
    } else {
      params.delete("status");
    }
    if (filterState.priority) {
      params.set("priority", filterState.priority);
    } else {
      params.delete("priority");
    }
    if (filterState.tagsIds.length > 0) {
      params.set("tags", filterState.tagsIds.join(","));
    } else {
      params.delete("tags");
    }

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
          onChange={(value, checked) => {
            if (checked) {
              setFilterState({ ...filterState, tagsIds: [...filterState.tagsIds, value.toString()] });
            } else {
              setFilterState({ ...filterState, tagsIds: filterState.tagsIds.filter((id) => id !== value) });
            }
          }}
        />

        {/* Apply Filters Button */}
        <Button variant="primary" onClick={applyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}
