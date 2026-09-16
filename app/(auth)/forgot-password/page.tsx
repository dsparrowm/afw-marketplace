import { Suspense } from "react";
import { AuthLayout } from "@/components/account/AuthLayout";
import { ForgotPasswordForm } from "@/components/account/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={null}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
