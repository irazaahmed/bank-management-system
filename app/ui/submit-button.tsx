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
    "w-full rounded-lg px-4 py-2.5 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "bg-blue-700 hover:bg-blue-800",
    danger: "bg-red-600 hover:bg-red-700",
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
