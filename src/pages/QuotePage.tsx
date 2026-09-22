import { useMutation } from "convex/react";
import { Badge } from "@/components/ui/badge";
import { AuroraBackdrop, SnowField } from "@/components/site/Backdrop";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { api } from "@/convex/_generated/api";
import { isBackendConnected } from "@/lib/convex";
import { saveLeadLocally, type QuotePayload } from "@/lib/quote";
import { business, stats } from "@/content/site";

/** Submits to Convex. Only mounted when a deployment URL is configured. */
function ConnectedWizard() {
  const submit = useMutation(api.leads.submit);
  return (
    <QuoteWizard
      onSubmit={async (payload) => {
        await submit(payload);
      }}
    />
  );
}

/**
 * Offline fallback so the page never dead-ends. Stores the request in the
 * browser and tells the visitor to call instead.
 */
function LocalWizard() {
  return (
    <QuoteWizard
      onSubmit={async (payload: QuotePayload) => {
        const score = 40 + Math.min(payload.services.length, 3) * 12;
        saveLeadLocally(payload, score);
        throw new Error(
          `We could not reach our office system just now. Your answers are saved in this browser — please call ${business.phone} and we will take the details over the phone.`,
        );
      }}
    />
  );
}

export function QuotePage() {
  return (
    <div className="relative isolate overflow-hidden pb-24 pt-14 sm:pt-16">
      <AuroraBackdrop />
      <SnowField count={16} className="opacity-50" />

      <div className="container relative">
        <header className="flex max-w-3xl flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="neon">Free · no obligation</Badge>
            <Badge variant="outline">Written price in 48 hrs</Badge>
            <Badge variant="outline">{stats.warrantyYears}-yr workmanship guarantee</Badge>
          </div>

          <h1 className="font-display text-[clamp(2rem,4.8vw,3.3rem)] font-bold leading-[1.02]">
            Let's get your <span className="gradient-flare neon-text-flare">real number.</span>
          </h1>

          <p className="text-[1.02rem] leading-relaxed text-muted-foreground">
            Six short steps, about two minutes. We ask for the detail that actually changes a siding, gutter or deck
            price — elevation exposure, home age, stories — because a quote built on a phone estimate is not a quote.
          </p>
        </header>

        <div className="mt-12">{isBackendConnected ? <ConnectedWizard /> : <LocalWizard />}</div>
      </div>
    </div>
  );
}
