"use client";
import { ChevronDown } from "lucide-react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  options: Option[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const inputId = (name: Path<FieldValues>) =>
  `field-${String(name).replace(/\./g, "-")}`;

const selectInputClasses =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 pr-10 text-neutral-900 shadow-sm transition placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-neutral-50 disabled:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 appearance-none cursor-pointer";

export function SelectField<T extends FieldValues>({
  name,
  label,
  className,
  options,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div
          className={`flex flex-col gap-1.5 md:flex-row md:items-center md:gap-4 ${className ?? ""}`.trim()}
        >
          {label && (
            <label
              htmlFor={inputId(name)}
              className="shrink-0 text-sm font-medium  md:min-w-28"
            >
              {label}
            </label>
          )}
          <div className="min-w-0 flex-1">
            <div className="relative">
              <select
                {...field}
                {...props}
                id={inputId(name)}
                className={selectInputClasses}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
              />
            </div>
            {error && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                {error.message}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
}
