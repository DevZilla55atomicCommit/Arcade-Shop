"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-body-sm font-medium text-arcade-fg-primary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-arcade-fg-muted pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "input-arcade",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-arcade-accent-pink focus:border-arcade-accent-pink focus:neon-glow-pink",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-arcade-fg-muted pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-body-sm text-arcade-accent-pink flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-body-sm text-arcade-fg-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-body-sm font-medium text-arcade-fg-primary mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn("input-arcade resize-y min-h-[100px]", error && "border-arcade-accent-pink", className)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-body-sm text-arcade-accent-pink flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-1.5 text-body-sm text-arcade-fg-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-body-sm font-medium text-arcade-fg-primary mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn("input-arcade appearance-none bg-arcade-bg-deep", error && "border-arcade-accent-pink", className)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-body-sm text-arcade-accent-pink flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1.5 text-body-sm text-arcade-fg-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            "mt-1 w-4 h-4 rounded-pixel border-2 border-arcade-fg-muted/30 text-arcade-accent-pink bg-arcade-bg-deep",
            "focus:outline-none focus:ring-2 focus:ring-arcade-accent-pink focus:ring-offset-2 focus:ring-offset-arcade-bg-deep",
            "checked:border-arcade-accent-pink checked:bg-arcade-accent-pink",
            "hover:border-arcade-accent-pink/50 transition-all duration-200",
            className
          )}
          {...props}
        />
        <div className="flex-1">
          <label htmlFor={checkboxId} className="flex items-start gap-2 cursor-pointer">
            <span className="text-body-md text-arcade-fg-primary">{label}</span>
          </label>
          {description && (
            <p className="ml-6 mt-1 text-body-sm text-arcade-fg-muted">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
}

export function RadioGroup({ label, name, options, value, onChange, className, error }: RadioGroupProps) {
  return (
    <fieldset className={cn("w-full", className)}>
      <legend className="block text-body-sm font-medium text-arcade-fg-primary mb-3">{label}</legend>
      <div className="space-y-2" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <label key={option.value} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className={cn(
                "mt-1 w-4 h-4 rounded-full border-2 border-arcade-fg-muted/30 text-arcade-accent-pink bg-arcade-bg-deep",
                "focus:outline-none focus:ring-2 focus:ring-arcade-accent-pink focus:ring-offset-2 focus:ring-offset-arcade-bg-deep",
                "checked:border-arcade-accent-pink checked:bg-arcade-accent-pink",
                "group-hover:border-arcade-accent-pink/50 transition-all duration-200"
              )}
            />
            <div>
              <span className="block text-body-md text-arcade-fg-primary group-hover:text-arcade-accent-pink transition-colors">
                {option.label}
              </span>
              {option.description && (
                <p className="ml-6 mt-0.5 text-body-sm text-arcade-fg-muted">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-body-sm text-arcade-accent-pink flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </fieldset>
  );
}

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const switchId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer" htmlFor={switchId}>
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            className="sr-only"
            {...props}
          />
          <div className={cn(
            "w-11 h-6 rounded-full bg-arcade-fg-muted/30",
            "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-arcade-accent-pink peer-focus:ring-offset-2 peer-focus:ring-offset-arcade-bg-deep",
            "peer-checked:bg-arcade-accent-pink peer-checked:neon-glow-pink",
            "transition-all duration-300",
            props.checked && "bg-arcade-accent-pink",
            className
          )}>
            <span className={cn(
              "absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-lg",
              "transition-transform duration-300",
              "peer-checked:translate-x-5",
              "peer-checked:bg-arcade-bg-deep"
            )} aria-hidden="true" />
          </div>
        </label>
        <div>
          <span className="text-body-md text-arcade-fg-primary">{label}</span>
          {description && <p className="text-body-sm text-arcade-fg-muted">{description}</p>}
        </div>
      </div>
    );
  }
);

Switch.displayName = "Switch";