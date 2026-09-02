import { AuthLayout } from "@/components/account/AuthLayout";
import { SignupForm } from "@/components/account/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
