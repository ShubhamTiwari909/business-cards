"use client";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  as?: "input" | "textarea";
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const inputId = (name: Path<FieldValues>) =>
  `field-${String(name).replace(/\./g, "-")}`;

export function TextField<T extends FieldValues>({
  name,
  label,
  className,
  as = "input",
  ...props
}: Props<T>) {
  const { control } = useFormContext();
  const InputComponent = as === "textarea" ? "textarea" : "input";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`flex flex-col gap-1.5 md:flex-row md:items-center md:gap-4 w-full ${className ?? ""}`.trim()}>
          {label && (
            <label
              htmlFor={inputId(name)}
              className="shrink-0 text-sm font-medium  md:min-w-28"
            >
              {label}
            </label>
          )}
          <div className="min-w-0 flex-1 relative">
            <InputComponent
              {...field}
              {...props}
              id={inputId(name)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 shadow-sm transition placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-neutral-50 disabled:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
            />
            {error && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400 absolute -bottom-6 left-0">
                {error.message}
              </p>
            )}
          </div>

        </div>
      )}
    />
  );
}