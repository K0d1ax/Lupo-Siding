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
    /*
     * Layout note: this section deliberately stacks full-width instead of using the
     * heading-in-left-column split. A two-column split starves both halves — the
     * heading is a display size that needs width, and the carousel needs at least
     * three cards across. Stacking also removes the dead space a tall left column
     * leaves beside a short carousel.
     */
    <section id="reviews" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="What neighbours say"
          title={
            <>
              Word travels fast <span className="gradient-steel">in a town this size.</span>
            </>
          }
          lead="Cheyenne is a 65,000-person city where one bad job follows you for a decade. That is the entire reason we over-detail."
        />

        {/* Rating summary — one wide instrument panel: score, spread, and what people keep mentioning. */}
        <Reveal delay={0.14} className="mt-10">
          <NeonPanel className="p-6 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
              <div className="flex items-center gap-5 lg:shrink-0">
                <p className="font-display text-[3.2rem] font-semibold leading-none neon-text">
                  {reviewSummary.average}
                </p>
                <div className="min-w-0">
                  <Stars count={5} />
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {reviewSummary.total} verified reviews
                  </p>
                </div>
              </div>

              <dl className="w-full space-y-1.5 lg:w-64 lg:shrink-0 xl:w-72">
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

              <div className="flex flex-wrap gap-2 lg:ml-auto lg:max-w-md lg:justify-end">
                {reviewSummary.highlights.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </NeonPanel>
        </Reveal>

        {/* Carousel — full width so three cards sit across on a desktop. */}
        <div className="mt-12 flex min-w-0 flex-col">
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

          {/*
            `overflow-x-auto` forces `overflow-y` to compute to `auto`, so this box clips
            at its padding edge on ALL sides. The padding here is the room the neon-edge
            glow needs to breathe; without it the outer 1px ring and the whole top of the
            glow get sliced off flat, which reads as the cards being cut off and the light
            looking boxed in. The negative margins cancel the padding so the first card
            stays flush with the container edge and the section keeps its rhythm.
            `scroll-px-4` insets the snapport by the same amount — otherwise snapping to
            the next card would scroll the padding out of view and re-clip the glow.
          */}
          <div
            ref={scrollerRef}
            className="no-scrollbar neon-rail -mx-4 -my-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 py-6"
            tabIndex={0}
            role="region"
            aria-label="Customer reviews"
          >
            {testimonials.map((review) => (
              /*
               * Width is exactly one third of the rail minus the two 1.25rem gaps, so
               * three cards fill it edge to edge and the fourth is fully hidden. A fixed
               * width can't do this — whatever the rail has left over peeks the next card
               * — so deriving it from the rail means it can never drift out of step with
               * the gap. Below lg, three across would be unreadable, so cards fall back to
               * a phone-friendly fixed width and the rail just shows fewer of them.
               *
               * Written as `* 0.333333` rather than `/ 3`: a bare slash in a Tailwind
               * arbitrary value is parsed as its opacity modifier, which silently drops the
               * whole class and leaves the peek behind. `(100% - 2.5rem) * 0.333333` is the
               * same number and compiles.
               */
              <figure
                key={review.name}
                data-review-card
                className="group glass neon-edge relative w-[min(84vw,24rem)] shrink-0 snap-start rounded-2xl p-6 lg:w-[calc((100%_-_2.5rem)*0.333333)]"
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
    </section>
  );
}
