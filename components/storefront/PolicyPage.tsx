import type { PolicyDocument } from "@/lib/storefront/policies";

export function PolicyPage({ document }: { document: PolicyDocument }) {
  return (
    <article className="mx-auto max-w-[1440px] px-4 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          {document.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{document.intro}</p>
        <div className="mt-10 space-y-8">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-6 text-foreground/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-12 text-xs leading-5 text-muted-foreground">
          Review required before launch. This page describes current storefront behavior
          and does not waive any right you have under applicable law.
        </p>
      </div>
    </article>
  );
}
