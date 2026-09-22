import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackdrop, MountainRidge, SnowField } from "@/components/site/Backdrop";

export function NotFoundPage() {
  return (
    <div className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <AuroraBackdrop />
      <SnowField count={20} className="opacity-60" />
      <MountainRidge className="h-56 opacity-60" />

      <div className="container relative text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-neon/45 bg-neon/[0.08] text-neon-soft">
          <Compass className="size-6" />
        </span>

        <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.34em] text-neon-dim">Error 404</p>
        <h1 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.04]">
          This page blew off in the wind.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[1.02rem] leading-relaxed text-muted-foreground">
          Nothing here. Happens on the ridge. Head back to solid ground and we will get you a real quote instead.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/">
              Back to the home page <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/quote">Get a free quote</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
