import { AuthShell } from "@/app/ui/auth-shell";
import { RegisterForm } from "@/app/ui/register-form";

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account" subtitle="Join AR Bank in seconds">
      <RegisterForm />
    </AuthShell>
  );
}
