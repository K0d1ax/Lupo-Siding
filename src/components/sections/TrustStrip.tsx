import { BadgeCheck, FileCheck2, HardHat, ShieldCheck, Star, Truck } from "lucide-react";
import { brands } from "@/content/site";

const credentials = [
  { icon: <BadgeCheck className="size-4" />, label: "Wyoming licensed contractor" },
  { icon: <ShieldCheck className="size-4" />, label: "General liability + workers' comp" },
  { icon: <HardHat className="size-4" />, label: "Our own crews — no sub roster" },
  { icon: <FileCheck2 className="size-4" />, label: "Written fixed-price proposals" },
  { icon: <Truck className="size-4" />, label: "Seamless gutters rolled on site" },
  { icon: <Star className="size-4 fill-flare-soft text-flare-soft" />, label: "217 verified local reviews" },
];

export function TrustStrip() {
  return (
    <section aria-label="Credentials and materials" className="relative border-y border-white/[0.08] py-8">
      {/* brands marquee */}
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="whitespace-nowrap font-display text-[1.02rem] font-semibold tracking-tight text-white/28 transition-colors duration-500 hover:text-white/70"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* credentials */}
      <div className="container mt-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {credentials.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
              <span className="text-neon-soft">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
