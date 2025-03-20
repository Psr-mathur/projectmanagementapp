import React from 'react'

type TProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string,
  error?: boolean,
  message?: string,
}
export function Input({ label, error, message, ...props }: TProps) {
  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type="text"
        className="input w-full"
        placeholder="Type here"
        {...props}
      />
      {message && (
        <p className={`fieldset-label ${error ? "text-red-500" : ""}`}>{message}</p>
      )}
    </fieldset>
  )
}
