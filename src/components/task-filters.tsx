import { useState } from "react";
import { Input } from './ui/input';
import { Radio } from './ui/radio';
import { Dropdown } from './ui/dropdown';
import { CheckboxGroup } from './ui/checkbox';
import { Button } from './ui/button';

export function TaskFilters() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <div className="card-body space-y-4">
        <h2 className="card-title">Filters</h2>

        <Input
          label='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Status Selection (Radio Group) */}
        <Radio
          label="Status"
          options={[
            { label: "All", value: "all" },
            { label: "Open", value: "open" },
            { label: "In Progress", value: "in-progress" },
            { label: "Closed", value: "closed" },
          ]}
          name="status"
          onChange={(e) => console.log(29, e.target.value)}
          value={"all"}
        />

        {/* Priority Dropdown */}
        <Dropdown
          label="Priority"
          options={[
            { label: "All", value: "all" },
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]}
          value="all"
        />

        {/* Assignee Dropdown */}
        <Dropdown
          label="Assignee"
          options={[
            { label: "All", value: "all" },
            { label: "John Doe", value: "john" },
            { label: "Sarah Smith", value: "sarah" },
            { label: "Mike Johnson", value: "mike" },
            { label: "Emily Chen", value: "emily" },
            { label: "Alex Turner", value: "alex" },
          ]}
          value="all"
        />

        {/* Tags (Checkboxes) */}
        <CheckboxGroup
          label="Tags"
          options={[
            { label: "Bug", value: "bug" },
            { label: "Feature", value: "feature" },
            { label: "Documentation", value: "documentation" },
            { label: "Design", value: "design" },
          ]}
          selectedValues={['bug', 'feature']}
          onChange={(value, checked) => console.log(72, value, checked)}
        />

        {/* Apply Filters Button */}
        <Button variant='primary'>Apply Filters</Button>
      </div>
    </div>
  );
}
