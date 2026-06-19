"use client";

import { useActionState, useEffect, useRef } from "react";
import { transferAction } from "@/app/actions/bank";
import { SubmitButton } from "@/app/ui/submit-button";
import { TextField } from "@/app/ui/text-field";

export function TransferForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState(transferAction, undefined);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <TextField
        label="Receiver Username"
        name="receiverUsername"
        required
        placeholder="e.g. ali"
      />
      <TextField
        label="Amount (Rs.)"
        name="amount"
        type="number"
        min="0.01"
        step="0.01"
        required
        placeholder="0.00"
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

      <SubmitButton pendingText="Sending...">Transfer Money</SubmitButton>
    </form>
  );
}
