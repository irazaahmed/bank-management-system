"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { SubmitButton } from "@/app/ui/submit-button";
import { TextField } from "@/app/ui/text-field";

export function LoginForm() {
  const [state, action] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <TextField
        label="Username"
        name="username"
        required
        autoFocus
        autoComplete="username"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
      />

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton pendingText="Logging in...">Login</SubmitButton>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-blue-700 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
