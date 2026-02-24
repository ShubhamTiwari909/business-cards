import { cn } from "@/lib/utils";

const Checkbox = ({
  label,
  onChange,
  className,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  return (
    <label
      className={cn("flex cursor-pointer items-center gap-2", className ?? "")}
    >
      <span>{label}</span>
      <input
        type="checkbox"
        className="size-4 shrink-0 rounded border border-neutral-300 bg-white shadow-sm transition accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-neutral-50 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:accent-blue-400 dark:focus:ring-blue-400/20"
        data-rounded="true"
        onChange={onChange}
      />
    </label>
  );
};

export default Checkbox;
