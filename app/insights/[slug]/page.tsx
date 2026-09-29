import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CtaPanel } from "@/components/sections/cta-panel";
import { getInsight, getAllInsights } from "@/lib/insights";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllInsights().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return { title: "Insights" };
  return { title: article.title, description: article.excerpt };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  return (
    <main id="main" className="flex-1">
      {/* Header — category, title, excerpt */}
      <section className="container-xl pt-40 pb-8">
        <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {`${article.category} · ${article.dateLabel} · ${article.readTime}`}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-h1 font-medium text-text-primary">
          {article.title}
        </h1>
        <p className="mt-6 font-body text-body-lg text-text-secondary measure-body">
          {article.excerpt}
        </p>
      </section>

      {/* Cover */}
      <section className="container-xl pb-16">
        <div className="aspect-video overflow-hidden rounded-xl bg-bg-secondary">
          <Image
            src={article.cover.src}
            alt={article.cover.alt}
            width={article.cover.src.width}
            height={article.cover.src.height}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Body — editorial paragraphs, controlled measure */}
      <section className="container-xl pb-24">
        <div className="measure-body">
          {article.body.map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "font-body text-body-lg text-text-primary"
                  : "mt-8 font-body text-body-lg text-text-secondary"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16">
          <Button as="link" href="/insights" variant="ghost">
            ← Back to insights
          </Button>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}