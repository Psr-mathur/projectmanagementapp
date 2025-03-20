import React from "react";

type TProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value"
> & {
  label: string;
  options: { label: string; value: string }[];
  name: string;
  error?: boolean;
  message?: string;
  selectedValue?: string;
};

export function Radio({ label, options, name, error, message, selectedValue, ...props }: TProps) {
  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">{label}</legend>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="label cursor-pointer flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              className="radio"
              defaultChecked={option.value === selectedValue}
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