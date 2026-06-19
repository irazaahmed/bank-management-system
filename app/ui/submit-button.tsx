"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText = "Please wait...",
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  variant?: "primary" | "danger";
}) {
  const { pending } = useFormStatus();

  const base =
    "w-full rounded-lg px-4 py-2.5 font-medium text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    danger:
      "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
