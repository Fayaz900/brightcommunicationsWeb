"use client";

import { useEffect, useId, useState } from "react";

type AdminFieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

export function AdminField({
  label,
  htmlFor,
  error,
  hint,
  children,
}: AdminFieldProps) {
  const generatedId = useId();
  const fieldId = htmlFor ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div className={`admin-field${error ? " admin-field--invalid" : ""}`}>
      <label htmlFor={fieldId}>{label}</label>
      {children}
      {hint && !error ? <p className="admin-field__hint">{hint}</p> : null}
      {error ? (
        <p className="admin-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function useFieldErrorsFromState(
  state: { fieldErrors?: Record<string, string>; error?: string },
) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (state.fieldErrors) {
      setFieldErrors(state.fieldErrors);
    }
  }, [state.fieldErrors]);

  return [fieldErrors, setFieldErrors] as const;
}
