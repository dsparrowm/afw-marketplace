export type SettingsPlaceholderPanelProps = {
  title: string;
};

export function SettingsPlaceholderPanel({
  title,
}: SettingsPlaceholderPanelProps) {
  return (
    <section className="min-w-0 flex-1 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        This settings section is listed in the Figma Settings nav. Detailed
        controls will follow when design-context or a dedicated frame is
        available.
      </p>
    </section>
  );
}
