import React from "react";

type TProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string; // Label for the radio group
  options: { label: string; value: string }[]; // Array of radio options
  name: string; // Group name for radio buttons
  error?: boolean; // To display an error state
  message?: string; // Optional error or helper message
};

export function Radio({ label, options, name, error, message, ...props }: TProps) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="label cursor-pointer flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              className="radio"
              {...props}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="fieldset-label text-red-500">{message}</p>}
    </fieldset>
  );
}