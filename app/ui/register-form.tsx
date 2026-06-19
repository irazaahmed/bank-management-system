"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import { SubmitButton } from "@/app/ui/submit-button";
import { TextField } from "@/app/ui/text-field";

export function RegisterForm() {
  const [state, action] = useActionState(registerAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <TextField
        label="Username"
        name="username"
        required
        autoFocus
        minLength={3}
        maxLength={20}
        autoComplete="username"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        minLength={6}
        autoComplete="new-password"
      />

      <p className="text-xs text-gray-500">
        New accounts start with a welcome bonus of Rs. 1,000.
      </p>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton pendingText="Creating account...">Sign Up</SubmitButton>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-700 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
