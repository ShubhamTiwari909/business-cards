import React from "react";

const UploadField = ({
  label,
  handleUploadChange,
  inputRef,
  id = "upload",
}: {
  handleUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  id?: string;
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {label && (
        <label
          htmlFor={id}
          className="shrink-0 text-sm font-medium  md:min-w-28"
        >
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        id={id}
        type="file"
        onChange={handleUploadChange}
        className="rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 shadow-sm transition placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-neutral-50 disabled:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
      />
    </div>
  );
};

export default UploadField;
