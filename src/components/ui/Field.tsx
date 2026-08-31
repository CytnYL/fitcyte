import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";

const baseInputClasses =
  "w-full rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur focus:outline-none focus:ring-2 focus:ring-accent";

function FieldWrapper({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  error,
  hint,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string; id: string }) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint}>
      <input id={id} className={baseInputClasses} aria-invalid={!!error} {...props} />
    </FieldWrapper>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  id,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; hint?: string; id: string }) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint}>
      <textarea id={id} className={`${baseInputClasses} min-h-28 resize-y`} aria-invalid={!!error} {...props} />
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  error,
  hint,
  id,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; hint?: string; id: string }) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint}>
      <select id={id} className={baseInputClasses} aria-invalid={!!error} {...props}>
        {children}
      </select>
    </FieldWrapper>
  );
}
