"use client";

import { useId } from "react";
import { cn } from "../../utils/helpers";

const CONTROL =
  "w-full rounded-2xl border bg-white/[0.04] px-5 py-3.5 text-cream placeholder:text-white/30 transition-colors duration-300 focus:border-gold-400 focus:bg-white/[0.07] focus:outline-none";

/**
 * Labelled form control with inline validation messaging.
 * Renders an input, textarea or select depending on `as`.
 */
function Field({
  label,
  name,
  as = "input",
  error,
  hint,
  options = [],
  className,
  children,
  ...rest
}) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const controlClasses = cn(
    CONTROL,
    error ? "border-red-400/70" : "border-white/10",
    as === "textarea" && "min-h-36 resize-y"
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-[3px] text-white/50"
      >
        {label}
      </label>

      {as === "textarea" && (
        <textarea
          id={id}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={controlClasses}
          {...rest}
        />
      )}

      {as === "select" && (
        <select
          id={id}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(controlClasses, "appearance-none")}
          {...rest}
        >
          {children ??
            options.map((option) => {
              const value = typeof option === "object" ? option.value : option;
              const label = typeof option === "object" ? option.label : option;

              return (
                <option
                  key={value}
                  value={value}
                  className="bg-espresso-800 text-cream"
                >
                  {label}
                </option>
              );
            })}
        </select>
      )}

      {as === "input" && (
        <input
          id={id}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={controlClasses}
          {...rest}
        />
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      {!error && hint && (
        <p id={`${id}-hint`} className="text-sm text-white/35">
          {hint}
        </p>
      )}
    </div>
  );
}

export default Field;
