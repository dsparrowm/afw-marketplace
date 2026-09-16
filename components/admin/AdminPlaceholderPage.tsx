import Link from "next/link";

export type AdminPlaceholderPageProps = {
  title: string;
  description?: string;
};

export function AdminPlaceholderPage({
  title,
  description = "This admin screen is scaffolded from the Figma Admin canvas. Implementation follows the overview shell.",
}: AdminPlaceholderPageProps) {
  return (
    <div className="px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
      <p className="mt-6 text-sm">
        <Link href="/admin" className="text-admin-nav-active-foreground underline-offset-4 hover:underline">
          Back to Overview
        </Link>
      </p>
    </div>
  );
}
