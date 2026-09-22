import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { MaterialsStudio } from "@/components/sections/MaterialsStudio";
import { Climate } from "@/components/sections/Climate";
import { Process } from "@/components/sections/Process";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Work } from "@/components/sections/Work";
import { Testimonials } from "@/components/sections/Testimonials";
import { Guarantees } from "@/components/sections/Guarantees";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Faq } from "@/components/sections/Faq";
import { QuoteCta } from "@/components/sections/QuoteCta";

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <MaterialsStudio />
      <Climate />
      <Process />
      <BeforeAfter />
      <Work />
      <Testimonials />
      <Guarantees />
      <ServiceArea />
      <Faq />
      <QuoteCta />
    </>
  );
}
