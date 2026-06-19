"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { resetSystemAction } from "@/app/actions/bank";
import { SubmitButton } from "@/app/ui/submit-button";

export function ResetButton() {
  const [state, action] = useActionState(resetSystemAction, undefined);

  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "This will permanently delete all non-admin users and transactions. Continue?",
        );
        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="space-y-3"
    >
      <SubmitButton variant="danger" pendingText="Resetting...">
        <span className="flex items-center justify-center gap-2">
          <Trash2 className="h-4 w-4" />
          Reset System
        </span>
      </SubmitButton>

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
    </form>
  );
}
