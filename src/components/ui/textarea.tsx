import React, { type DetailedHTMLProps, type TextareaHTMLAttributes } from 'react'

type TProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label: string,
  error?: boolean,
  message?: string,
}
export function Textarea({ label, error, message, ...props }: TProps) {
  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">{label}</legend>
      <textarea className="textarea h-24 w-full" placeholder="Type here" {...props} />
      {message && (
        <p className={`fieldset-label ${error ? "text-red-500" : ""}`}>{message}</p>
      )}
    </fieldset>
  )
}
