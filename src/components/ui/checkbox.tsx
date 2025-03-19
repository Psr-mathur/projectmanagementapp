import React from "react";

type CheckboxOption = {
  label: string; // Label for the checkbox
  value: string | number; // Value for the checkbox
};

type TProps = {
  label: string; // Label for the checkbox group
  options: CheckboxOption[]; // Array of checkbox options
  selectedValues: (string | number)[]; // Array of selected values
  onChange: (value: string | number, checked: boolean) => void; // Change handler
  error?: boolean; // To display an error state
  message?: string; // Optional error or helper message
};

export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  error,
  message,
}: TProps) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label
            key={index}
            className="label cursor-pointer flex items-center space-x-2"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={(e) => onChange(option.value, e.target.checked)}
              className="checkbox"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {message && (
        <p className={`fieldset-label ${error ? "text-red-500" : ""}`}>
          {message}
        </p>
      )}
    </fieldset>
  );
}