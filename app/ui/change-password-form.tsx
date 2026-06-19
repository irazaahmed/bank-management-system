"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePasswordAction } from "@/app/actions/auth";
import { SubmitButton } from "@/app/ui/submit-button";
import { TextField } from "@/app/ui/text-field";

export function ChangePasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState(changePasswordAction, undefined);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <TextField
        label="Current Password"
        name="oldPassword"
        type="password"
        required
        autoComplete="current-password"
      />
      <TextField
        label="New Password"
        name="newPassword"
        type="password"
        required
        minLength={6}
        autoComplete="new-password"
      />

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {state.success}
        </p>
      )}

      <SubmitButton pendingText="Updating...">Change Password</SubmitButton>
    </form>
  );
}
