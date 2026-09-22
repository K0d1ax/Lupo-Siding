import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeonPanel } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";
import { DeckFramingSection, GutterSection, SidingWallSection } from "@/components/site/Blueprint";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/content/site";
import { cn } from "@/lib/utils";

const accentText = {
  flare: "text-flare-soft",
  glacier: "text-glacier-soft",
  copper: "text-copper-soft",
} as const;

function Blueprint({ id, className }: { id: string; className?: string }) {
  if (id === "siding") return <SidingWallSection className={className} />;
  if (id === "gutters") return <GutterSection className={className} />;
  return <DeckFramingSection className={className} />;
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Three trades, one crew"
          title={
            <>
              Everything above the foundation,{" "}
              <span className="gradient-steel">done by the same hands.</span>
            </>
          }
          lead="Most Cheyenne companies bolt siding onto a roofing business. We are a building-envelope company — the wall, the water and the living space outside it — which means the flashing details actually line up between trades."
        />

        <Reveal delay={0.1} className="mt-12">
          <Tabs defaultValue="siding" className="w-full">
            <TabsList className="mx-auto max-w-2xl">
              {services.map((service) => (
                <TabsTrigger key={service.id} value={service.id}>
                  {service.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <div className="grid gap-8 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
                  {/* copy */}
                  <div className="flex flex-col">
                    <Badge variant={service.accent === "flare" ? "flare" : service.accent === "copper" ? "copper" : "glacier"}>
                      {service.kicker}
                    </Badge>

                    <h3 className="mt-5 font-display text-[clamp(1.6rem,3.2vw,2.35rem)] font-semibold leading-[1.1]">
                      {service.headline}
                    </h3>

                    <p className="mt-4 text-[1rem] leading-relaxed text-muted-foreground">{service.blurb}</p>

                    <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-[0.92rem] leading-snug">
                          <Check className={cn("mt-0.5 size-4 shrink-0", accentText[service.accent])} strokeWidth={3} />
                          <span className="text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className={cn("size-4", accentText[service.accent])} />
                        <span>
                          <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">
                            From
                          </span>
                          <span className="font-display text-[0.98rem] font-semibold">{service.priceFrom}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className={cn("size-4", accentText[service.accent])} />
                        <span>
                          <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">
                            Schedule
                          </span>
                          <span className="font-display text-[0.98rem] font-semibold">{service.timeline}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Ruler className={cn("size-4", accentText[service.accent])} />
                        <span>
                          <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">
                            Estimate
                          </span>
                          <span className="font-display text-[0.98rem] font-semibold">Free, on site</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button asChild>
                        <Link to="/quote">
                          Get {service.name.toLowerCase()} pricing <ArrowRight />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost">
                        <Link to="/#work">See {service.name.toLowerCase()} projects</Link>
                      </Button>
                    </div>
                  </div>

                  {/* blueprint */}
                  <NeonPanel className="flex flex-col p-2">
                    <div className="relative overflow-hidden rounded-[0.85rem] border border-white/[0.08]">
                      <Blueprint id={service.id} />
                    </div>
                    <p className="px-4 py-4 text-[12.5px] leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">Why you should care:</span>{" "}
                      {service.id === "siding"
                        ? "the cladding is the last 25% of the job. The water-resistive barrier, flashing and fastening behind it decide whether the wall survives year five."
                        : service.id === "gutters"
                          ? "size and pitch are engineered, not guessed. Undersized gutters are how a dry basement turns into a $12,000 foundation repair."
                          : "footings below frost depth and standoff hardware are invisible once the boards go down — and they are the only reason a deck stays flat."}
                    </p>
                  </NeonPanel>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
