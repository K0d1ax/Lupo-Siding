import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Badge } from "@/components/ui/badge";
import { business, navLinks, serviceAreas, services, stats } from "@/content/site";
import { telHref } from "@/lib/utils";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const coreAreas = serviceAreas.filter((a) => a.core);

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.09]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 size-[46rem] rounded-full bg-[radial-gradient(circle,hsl(var(--glacier)/0.11),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 size-[38rem] rounded-full bg-[radial-gradient(circle,hsl(var(--flare)/0.07),transparent_65%)] blur-3xl" />
      </div>

      <div className="container relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_1fr_1.15fr]">
          {/* brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.93rem] leading-relaxed text-muted-foreground">
              {business.tagline.replace(".", "")} — siding, seamless gutters and decks installed for the wind, hail and
              freeze-thaw of Laramie County since {business.founded}.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="neon">
                <ShieldCheck className="size-3" /> {stats.warrantyYears}-yr workmanship
              </Badge>
              <Badge variant="outline">Licensed &amp; insured</Badge>
            </div>

            <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground/70">
              {business.license}
            </p>
          </div>

          {/* services */}
          <nav aria-label="Services">
            <h3 className="eyebrow">Services</h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/#services"
                    className="text-[0.93rem] text-muted-foreground transition-colors hover:text-neon-soft"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/#materials" className="text-[0.93rem] text-muted-foreground transition-colors hover:text-neon-soft">
                  Materials &amp; colours
                </Link>
              </li>
              <li>
                <Link to="/#climate" className="text-[0.93rem] text-muted-foreground transition-colors hover:text-neon-soft">
                  Storm &amp; hail repair
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-[0.93rem] text-muted-foreground transition-colors hover:text-neon-soft">
                  Free estimate
                </Link>
              </li>
            </ul>
          </nav>

          {/* company */}
          <nav aria-label="Company">
            <h3 className="eyebrow">Company</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.slice(2).map((link) => (
                <li key={link.href}>
                  <Link
                    to={`/${link.href}`}
                    className="text-[0.93rem] text-muted-foreground transition-colors hover:text-neon-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/#guarantees" className="text-[0.93rem] text-muted-foreground transition-colors hover:text-neon-soft">
                  Guarantees
                </Link>
              </li>
              <li>
                <Link to="/portal" className="text-[0.93rem] text-muted-foreground transition-colors hover:text-neon-soft">
                  Owner portal
                </Link>
              </li>
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="eyebrow">Talk to a human</h3>
            <ul className="mt-5 space-y-4 text-[0.93rem]">
              <li>
                <a href={telHref(business.phone)} className="group flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-neon-soft" />
                  <span>
                    <span className="block font-display font-semibold">{business.phone}</span>
                    <span className="text-muted-foreground">Call or text, 7 days during storm season</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-neon-soft" />
                  <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                    {business.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-neon-soft" />
                <span className="text-muted-foreground">
                  {business.street}
                  <br />
                  {business.city}, {business.state} {business.zip}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-neon-soft" />
                <span className="space-y-0.5 text-muted-foreground">
                  {business.hours.map((row) => (
                    <span key={row.days} className="block">
                      <span className="text-foreground/80">{row.days}</span> · {row.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* service areas */}
        <div className="mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <h3 className="eyebrow">Serving Laramie County &amp; the Front Range</h3>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
            {serviceAreas.map((area) => (
              <li key={area.town}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-neon/70 shadow-[0_0_6px_hsl(var(--neon)/0.9)]" />
                  {area.town}
                  {area.note ? <span className="text-muted-foreground/50">· {area.note}</span> : null}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12.5px] text-muted-foreground/70">
            {coreAreas.length} core communities in {business.state} plus the northern Colorado corridor.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-muted-foreground/70">
            © {year} {business.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground/60">
            {business.city}, {business.state} · {business.zip} · Site by a local designer
          </p>
        </div>
      </div>
    </footer>
  );
}
