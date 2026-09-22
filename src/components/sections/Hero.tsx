import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, Play, Snowflake, Star, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBackdrop, MountainRidge, SnowField } from "@/components/site/Backdrop";
import { HouseScene } from "@/components/site/HouseScene";
import { TiltCard } from "@/components/site/TiltCard";
import { CountUp } from "@/components/motion/Reveal";
import { business, stats } from "@/content/site";

const heroStats = [
  { label: "Year workmanship guarantee", value: stats.warrantyYears, suffix: " yr" },
  { label: "Laramie County projects", value: stats.projectsCompleted, suffix: "+" },
  { label: "Average customer rating", value: stats.rating, suffix: "★", decimals: 1 },
  { label: "Years on the high plains", value: stats.yearsInBusiness, suffix: " yr" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
      <AuroraBackdrop />
      <SnowField count={26} className="opacity-70" />
      <MountainRidge className="h-64 opacity-70" />

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.06fr_1fr] lg:gap-10">
          {/* ---------------- copy ---------------- */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <Badge variant="neon">
                <MapPin className="size-3" /> {business.city}, {business.state} · since {business.founded}
              </Badge>
              <Badge variant="outline">
                <Star className="size-3 fill-flare-soft text-flare-soft" /> {stats.rating} / {stats.reviewCount} reviews
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 font-display text-[clamp(2.5rem,6.4vw,4.6rem)] font-bold leading-[0.98]"
            >
              Siding built for the
              <br />
              <span className="gradient-flare neon-text-flare">Wyoming wind.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-muted-foreground sm:text-[1.12rem]"
            >
              6,086 feet of altitude. Sixty inches of snow. 2,980 hours of high-altitude sun and gusts that peel cheap
              vinyl straight off the wall. We install siding, seamless gutters and decks <em>engineered for this exact
              ZIP code</em> — and we put the fastening schedule in writing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="group">
                <Link to="/quote">
                  Start my free quote
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/#work">
                  <Play className="fill-current" /> See our work
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-muted-foreground"
            >
              {[
                { icon: <BadgeCheck className="size-4 text-neon-soft" />, label: "Licensed, bonded & insured" },
                { icon: <Wind className="size-4 text-neon-soft" />, label: "Wind-load fastening in writing" },
                { icon: <Snowflake className="size-4 text-neon-soft" />, label: "Frost-depth engineering" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ---------------- live render ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective"
          >
            <TiltCard intensity={6} className="rounded-[1.6rem]">
              <div className="neon-edge-strong hud-corners relative overflow-hidden rounded-[1.6rem] border border-white/10">
                <HouseScene color="#6C747E" trim="#F2F4F6" texture="lap" snow className="block" />

                {/* floating chips */}
                <div className="pointer-events-none absolute inset-0">
                  <motion.span
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    className="glass-soft absolute left-4 top-5 rounded-full border border-neon/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-neon-soft shadow-[0_0_22px_-8px_hsl(var(--neon)/0.8)]"
                  >
                    Iron Gray · lap
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.05, duration: 0.7 }}
                    className="glass-soft absolute right-4 top-5 flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    <span className="size-1.5 animate-pulse rounded-full bg-neon shadow-[0_0_8px_hsl(var(--neon))]" />
                    Wind-load spec on file
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.7 }}
                    className="glass-soft absolute bottom-5 left-4 flex items-center gap-2.5 rounded-2xl border border-flare/35 px-3.5 py-2.5 shadow-neon-flare"
                  >
                    <Snowflake className="size-4 text-flare-soft" />
                    <span className="flex flex-col leading-none">
                      <span className="font-display text-[0.95rem] font-semibold">Rated to −38°F</span>
                      <span className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
                        Cheyenne record low
                      </span>
                    </span>
                  </motion.span>
                </div>
              </div>
            </TiltCard>

            {/* under-glow */}
            <div
              className="pointer-events-none absolute -inset-x-6 -bottom-8 h-24 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--glacier)/0.22),transparent_70%)] blur-2xl"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* ---------------- stat rail ---------------- */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.045] lg:grid-cols-4"
        >
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative bg-[hsl(220_28%_5%/0.72)] px-6 py-7 backdrop-blur-sm"
              style={{ boxShadow: i === 0 ? undefined : "inset 1px 0 0 rgba(255,255,255,0.05)" }}
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</dt>
              <dd className="mt-3 font-display text-[2rem] font-semibold leading-none neon-text">
                <CountUp to={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
