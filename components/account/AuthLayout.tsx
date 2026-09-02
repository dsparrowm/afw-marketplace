import { AfwLogo } from "@/components/storefront/AfwLogo";
import { cn } from "@/lib/utils";

export type AuthLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centered auth canvas — Figma frame `29:15` / `28:1161`, 1200×1000 */
export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

/** Auth card shell — Figma `auth-card` 480px */
export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[480px] rounded-2xl border border-border bg-card p-10 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type AuthCardHeaderProps = {
  subtitle: string;
};

export function AuthCardHeader({ subtitle }: AuthCardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <AfwLogo priority className="mx-auto" />
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-border" aria-hidden />
      <span className="text-xs uppercase tracking-wide text-muted-foreground">or</span>
      <div className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}

export type AuthFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
};

export function AuthField({ label, htmlFor, error, children }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
