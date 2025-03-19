import React from "react";

type TProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label?: string; // Label for the dropdown
  options: { label: string; value: string | number }[]; // Array of dropdown options
  error?: boolean; // To display an error state
  message?: string; // Optional error or helper message
};

export function Dropdown({ label, options, error, message, ...props }: TProps) {
  return (
    <fieldset className="fieldset">
      {label && <legend className="fieldset-legend">{label}</legend>}
      <select className={`select ${error ? "select-error" : ""}`} {...props}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {message && (
        <p className={`fieldset-label ${error ? "text-red-500" : ""}`}>{message}</p>
      )}
    </fieldset>
  );
}