import * as React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConvexProvider } from "convex/react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PortalPage } from "@/pages/PortalPage";
import { QuotePage } from "@/pages/QuotePage";
import { convexClient } from "@/lib/convex";

/** Scrolls to the hash target on navigation, and to top on a plain route change. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait a frame so the destination route has mounted before measuring.
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    return undefined;
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const tree = (
    <TooltipProvider delayDuration={160} skipDelayDuration={220}>
      <BrowserRouter>
        <ScrollManager />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-neon focus:px-5 focus:py-2.5 focus:font-medium focus:text-[hsl(220_30%_5%)]"
        >
          Skip to content
        </a>

        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/portal" element={<PortalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );

  // Without a deployment URL the marketing site and wizard still work; only the
  // server-backed features fall back to local storage.
  return convexClient ? <ConvexProvider client={convexClient}>{tree}</ConvexProvider> : tree;
}
