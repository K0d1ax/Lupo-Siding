import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NeonPanel } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { reviewSummary, testimonials } from "@/content/site";
import { cn } from "@/lib/utils";

function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn("size-3.5", i < count ? "fill-flare-soft text-flare-soft" : "text-white/15")}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

export function Testimonials() {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="reviews" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-12">
          {/* summary + heading */}
          <div>
            <SectionHeading
              eyebrow="What neighbours say"
              title={
                <>
                  Word travels fast <span className="gradient-steel">in a town this size.</span>
                </>
              }
              lead="Cheyenne is a 65,000-person city where one bad job follows you for a decade. That is the entire reason we over-detail."
            />

            <Reveal delay={0.14} className="mt-8">
              <NeonPanel className="p-6">
                <div className="flex items-end gap-5">
                  <div>
                    <p className="font-display text-[3.2rem] font-semibold leading-none neon-text">
                      {reviewSummary.average}
                    </p>
                    <Stars count={5} className="mt-2" />
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {reviewSummary.total} verified reviews
                    </p>
                  </div>

                  <dl className="flex-1 space-y-1.5">
                    {reviewSummary.distribution.map((row, i) => {
                      const pct = (row.count / reviewSummary.total) * 100;
                      return (
                        <div key={row.stars} className="flex items-center gap-2.5">
                          <dt className="w-3 font-mono text-[10px] text-muted-foreground">{row.stars}</dt>
                          <dd className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                            <motion.span
                              className="block h-full rounded-full bg-gradient-to-r from-glacier to-neon"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </dd>
                          <span className="w-7 text-right font-mono text-[10px] text-muted-foreground">{row.count}</span>
                        </div>
                      );
                    })}
                  </dl>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
                  {reviewSummary.highlights.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </NeonPanel>
            </Reveal>
          </div>

          {/* carousel */}
          <div className="flex flex-col">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {testimonials.length} reviews
              </p>
              <div className="flex gap-2">
                {(
                  [
                    { dir: -1 as const, label: "Previous reviews", icon: <ChevronLeft className="size-4" /> },
                    { dir: 1 as const, label: "Next reviews", icon: <ChevronRight className="size-4" /> },
                  ]
                ).map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={() => scrollByCard(btn.dir)}
                    aria-label={btn.label}
                    className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-muted-foreground transition-all duration-300 hover:border-neon/50 hover:text-neon-soft"
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2"
              tabIndex={0}
              role="region"
              aria-label="Customer reviews"
            >
              {testimonials.map((review) => (
                <figure
                  key={review.name}
                  data-review-card
                  className="group glass neon-edge relative w-[min(84vw,25rem)] shrink-0 snap-start rounded-2xl p-6"
                >
                  <span className="neon-trace" aria-hidden="true" />
                  <Quote className="size-7 text-neon/25" />
                  <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-foreground/90">
                    "{review.quote}"
                  </blockquote>

                  <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full border border-neon/30 bg-neon/[0.08] font-display text-[0.9rem] font-semibold text-neon-soft">
                        {review.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block font-display text-[0.92rem] font-semibold">{review.name}</span>
                        <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
                          {review.location}
                        </span>
                      </span>
                    </div>
                    <div className="text-right">
                      <Stars count={review.rating} />
                      <span className="mt-1.5 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-neon-dim">
                        {review.service}
                      </span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
              Drag or swipe · Reviews are placeholders until the owner connects their Google Business profile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
