import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CtaPanel } from "@/components/sections/cta-panel";
import { SectionVideoBackground } from "@/components/sections/section-video-background";
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
      {/* Same section-scoped sticky ambient reel as the insights index — the
          article reads as part of the same body of work, with the video
          pinned behind it and the prose scrolling over it. Stage is full
          viewport height at every breakpoint so the parallax holds on mobile
          too, and the content below overlaps via -mt. The 1924x1076 (~16:9)
          source needs no horizontal stretch; desktop zoom matches /work. */}
      <section className="relative">
        {/* Background video - consistent with detail pages, subtly blurred */}
        <div aria-hidden="true" className="pointer-events-none sticky top-0 -z-10 h-svh w-full overflow-hidden">
          <video
            src="/media/videos/wvideo.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover blur-[6px]"
          />
          <div className="absolute inset-0 bg-bg-primary/70" />
        </div>

        <div className="relative z-10 -mt-[100svh]">
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
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}