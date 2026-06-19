import { AuthShell } from "@/app/ui/auth-shell";
import { LoginForm } from "@/app/ui/login-form";

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Login to access your account">
      <LoginForm />
    </AuthShell>
  );
}
