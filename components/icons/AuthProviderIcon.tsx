import { cn } from "@/lib/utils";

export type AuthProvider = "apple" | "google";

export type AuthProviderIconProps = {
  provider: AuthProvider;
  className?: string;
  size?: number;
};

/** Auth provider marks — SVG fallback for Figma `31:1250` / `31:1255` */
export function AuthProviderIcon({
  provider,
  className,
  size = 16,
}: AuthProviderIconProps) {
  if (provider === "apple") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden
        className={cn("shrink-0", className)}
      >
        <path d="M12.1 8.4c.02 2.1 1.84 2.8 1.86 2.81-.02.06-.29 1-1 1.98-.6.87-1.23 1.74-2.22 1.76-.97.02-1.28-.57-2.39-.57-1.1 0-1.44.55-2.35.59-.95.04-1.67-.96-2.28-1.83C2.36 11.1 1.28 7.75 3.01 5.5c.86-1.12 2.4-1.83 3.84-1.85 1.01-.02 1.96.67 2.57.67.61 0 1.97-.83 3.32-.71.56.02 2.14.23 3.15 1.73-.08.05-1.88 1.1-1.86 3.35zM10.3 2.5c.53-.64.89-1.53.79-2.42-.77.03-1.69.51-2.24 1.14-.49.57-.92 1.48-.8 2.35.85.07 1.72-.43 2.25-1.07z" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path
        fill="#4285F4"
        d="M15.6 8.2c0-.5 0-.9-.1-1.3H8v2.5h4.3c-.2 1-1 1.9-2.1 2.5v2h3.4c2-1.8 3.1-4.5 3.1-7.7z"
      />
      <path
        fill="#34A853"
        d="M8 16c2.8 0 5.2-.9 6.9-2.5l-3.4-2c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H1.1v2.1C2.8 14.1 5.9 16 8 16z"
      />
      <path
        fill="#FBBC05"
        d="M2.2 9.6c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V3.7H1.1C.4 5.1 0 6.5 0 8s.4 2.9 1.1 4.3l1.1-1.7z"
      />
      <path
        fill="#EA4335"
        d="M8 3.2c1.5 0 2.8.5 3.8 1.5l2.9-2.9C13.2.9 10.8 0 8 0 5.9 0 2.8 2.1 1.1 5.7l2.1 1.7C4 3.4 5.9 3.2 8 3.2z"
      />
    </svg>
  );
}
