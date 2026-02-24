import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import { CardSchemaInput } from "./types";
import { TextField } from "./TextField";
import { FieldArrayPath, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

type ArrayFieldProps = {
  fields: Array<{ id: string }>;
  append: () => void;
  remove: (index: number) => void;
  name: FieldArrayPath<CardSchemaInput>;
  limit: number;
  input: {
    placeholder: string;
    label: string;
    name: string;
  }[];
};

function ArrayField({
  fields,
  append,
  remove,
  name,
  limit,
  input,
}: ArrayFieldProps) {
  return (
    <div className="p-5 border border-gray-700 rounded-lg space-y-10">
      <div className="space-y-5">
        {fields.map((field, index) => (
          <div key={field.id} className="mb-10 last-of-type:mb-5">
            <div className="flex gap-2">
              <div
                className={cn(
                  input.length > 1 &&
                    "space-y-8 p-8 border border-gray-700 rounded-lg",
                  "w-full",
                )}
              >
                {input.map((item) => (
                  <TextField<CardSchemaInput>
                    key={item.name}
                    name={
                      `${name}.${index}.${item.name}` as Path<CardSchemaInput>
                    }
                    label={item.label}
                    placeholder={item.placeholder}
                  />
                ))}
              </div>
              {index > 0 && (
                <Button
                  onClick={() => remove(index)}
                  className="cursor-pointer"
                >
                  <FaTrash size={12} className="text-red-400" />
                </Button>
              )}
            </div>
          </div>
        ))}
        {fields.length < limit && (
          <Button onClick={append} className="cursor-pointer">
            <FaPlus size={12} className="text-green-600" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default ArrayField;
