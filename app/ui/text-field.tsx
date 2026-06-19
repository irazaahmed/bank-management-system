import type { LucideIcon } from "lucide-react";

export function TextField({
  label,
  name,
  type = "text",
  icon: Icon,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  icon?: LucideIcon;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            strokeWidth={2}
          />
        )}
        <input
          id={name}
          name={name}
          type={type}
          className={`w-full rounded-lg border border-gray-300 bg-white py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-50 disabled:text-gray-400 ${
            Icon ? "pl-9 pr-3" : "px-3"
          }`}
          {...rest}
        />
      </div>
    </div>
  );
}
