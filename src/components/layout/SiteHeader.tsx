import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Hammer, Layers, Menu, Phone, ShieldCheck, Waves, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Logo } from "@/components/site/Logo";
import { business, navLinks, services } from "@/content/site";
import { cn, telHref } from "@/lib/utils";

const serviceIcons: Record<string, React.ReactNode> = {
  siding: <Layers className="size-5" />,
  gutters: <Waves className="size-5" />,
  decks: <Hammer className="size-5" />,
};

const serviceDetails: Record<string, { label: string; href: string }[]> = {
  siding: [
    { label: "Fiber cement", href: "/#materials" },
    { label: "Engineered wood", href: "/#materials" },
    { label: "Insulated vinyl", href: "/#materials" },
    { label: "Board & batten", href: "/#materials" },
    { label: "Soffit, fascia & trim", href: "/#services" },
    { label: "Storm & hail repair", href: "/#climate" },
  ],
  gutters: [
    { label: '6" seamless K-style', href: "/#services" },
    { label: '5" seamless K-style', href: "/#services" },
    { label: "Half-round & box", href: "/#services" },
    { label: "Micro-mesh leaf guard", href: "/#services" },
    { label: "Buried drainage runs", href: "/#services" },
    { label: "Heat cable & snow guards", href: "/#climate" },
  ],
  decks: [
    { label: "Composite decking", href: "/#services" },
    { label: "Capped PVC", href: "/#services" },
    { label: "Cedar & pressure-treated", href: "/#services" },
    { label: "Cable & aluminum railing", href: "/#services" },
    { label: "Pergolas & privacy walls", href: "/#services" },
    { label: "Frost-depth footings", href: "/#climate" },
  ],
};

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function SiteHeader() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeTimer = React.useRef<number | undefined>(undefined);
  const location = useLocation();

  React.useEffect(() => setMobileOpen(false), [location.pathname, location.hash]);

  function openMenu() {
    window.clearTimeout(closeTimer.current);
    setMenuOpen(true);
  }

  /** Small grace period so the pointer can travel from button to panel. */
  function scheduleClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 200);
  }

  React.useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const servicesLink = navLinks[0];

  return (
    <>
      {/* ---------- promo strip ---------- */}
      <div className="relative z-50 border-b border-white/[0.07] bg-[hsl(220_32%_3%/0.9)]">
        <div className="container flex h-10 items-center justify-center">
          <p className="text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-flare-soft">Free storm inspection</span>
            <span className="mx-2.5 text-white/15">/</span>
            Laramie County &amp; Northern Colorado
          </p>
        </div>
      </div>

      {/* ---------- main nav ---------- */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled ? "glass border-b border-white/10 py-2 shadow-[0_18px_60px_-40px_#000]" : "py-3.5",
        )}
      >
        <div className="container flex items-center justify-between gap-4 xl:gap-6">
          <Link to="/" aria-label={`${business.name} home`} className="shrink-0">
            <Logo />
          </Link>

          {/* desktop nav */}
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              <li className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="services-mega-menu"
                  aria-haspopup="true"
                  onClick={() => (menuOpen ? setMenuOpen(false) : openMenu())}
                  onFocus={openMenu}
                  className={cn(
                    "flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9rem] font-medium transition-colors",
                    menuOpen
                      ? "bg-white/[0.06] text-foreground"
                      : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
                  )}
                >
                  {servicesLink.label}
                  <ChevronDown className={cn("size-3.5 transition-transform duration-300", menuOpen && "rotate-180")} />
                </button>
              </li>

              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    to={`/${link.href}`}
                    className="block whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9rem] font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* actions */}
          <div className="flex shrink-0 items-center gap-2.5">
            <a
              href={telHref(business.phone)}
              className="hidden shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 transition-colors hover:border-neon/40 md:inline-flex"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neon/[0.12] text-neon-soft">
                <Phone className="size-3.5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground 2xl:block">
                  7 days · storm line
                </span>
                <span className="font-display text-[0.9rem] font-semibold 2xl:mt-0.5">{business.phone}</span>
              </span>
            </a>

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/quote">
                Free estimate <ArrowRight />
              </Link>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid size-10 place-items-center rounded-xl border border-white/12 bg-white/[0.04] text-foreground transition-colors hover:border-neon/45 xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        {/* ---------- mega menu, anchored to the sticky header ---------- */}
        <div
          className="absolute inset-x-0 top-full hidden xl:block"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                id="services-mega-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="container"
              >
                <div className="glass neon-edge-strong hud-corners mt-3 overflow-hidden rounded-3xl p-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-neon/30"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-xl border border-neon/35 bg-neon/[0.08] text-neon-soft">
                            {serviceIcons[service.id]}
                          </span>
                          <div className="min-w-0">
                            <p className="font-display text-[0.98rem] font-semibold">{service.name}</p>
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                              {service.timeline}
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-1.5">
                          {serviceDetails[service.id].map((item) => (
                            <li key={item.label}>
                              <Link
                                to={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="block rounded-lg px-2 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-neon-soft"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-col items-start justify-between gap-3 rounded-2xl border border-neon/25 bg-neon/[0.05] p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="size-5 shrink-0 text-neon-soft" />
                      <p className="text-[13.5px] text-muted-foreground">
                        <span className="font-medium text-foreground">Free on-site walk-through</span> — measured
                        elevations, wind-load fastening plan, fixed written price.
                      </p>
                    </div>
                    <Button asChild size="sm" className="shrink-0">
                      <Link to="/quote" onClick={() => setMenuOpen(false)}>
                        Start my quote <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {scrolled ? (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hairline absolute inset-x-0 bottom-0 origin-left"
              aria-hidden="true"
            />
          ) : null}
        </AnimatePresence>
      </header>

      {/* ---------- mobile sheet ---------- */}
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent className="xl:hidden">
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <Logo />

          <nav aria-label="Mobile" className="mt-7 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={`/${link.href}`}
                className="flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-lg font-medium text-foreground transition-colors hover:bg-white/[0.05]"
              >
                {link.label}
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </nav>

          <div className="my-5 hairline" aria-hidden="true" />

          <div className="grid gap-2.5">
            {services.map((service) => (
              <Link
                key={service.id}
                to="/#services"
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 transition-colors hover:border-neon/35"
              >
                <span className="grid size-9 place-items-center rounded-lg border border-neon/30 bg-neon/[0.08] text-neon-soft">
                  {serviceIcons[service.id]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[0.95rem] font-semibold">{service.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {service.timeline}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 grid gap-2.5">
            <Button asChild size="lg">
              <Link to="/quote">
                Start my free quote <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={telHref(business.phone)}>
                <Phone /> {business.phone}
              </a>
            </Button>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <Wind className="size-3.5 shrink-0" /> {business.emergencyNote}
          </p>

          <DialogClose className="sr-only">Close</DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
