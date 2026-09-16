import { Suspense } from "react";
import { AuthLayout } from "@/components/account/AuthLayout";
import { ResetPasswordForm } from "@/components/account/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
