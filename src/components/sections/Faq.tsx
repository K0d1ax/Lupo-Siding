import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { business, faqs } from "@/content/site";
import { telHref } from "@/lib/utils";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.5fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Questions, answered"
              title={
                <>
                  The things people <span className="gradient-steel">actually ask us.</span>
                </>
              }
              lead="Straight answers with real numbers — including the ones a commissioned salesperson would rather dodge."
            />

            <Reveal delay={0.12} className="mt-8">
              <div className="neon-edge rounded-2xl bg-[hsl(220_28%_6%/0.7)] p-6">
                <span className="grid size-11 place-items-center rounded-xl border border-neon/35 bg-neon/[0.08] text-neon-soft">
                  <MessageSquare className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-[1.05rem] font-semibold">Still not sure?</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  Call and you will reach a person who has been on thousands of Cheyenne roofs and walls — not a call
                  centre.
                </p>
                <div className="mt-5 grid gap-2.5">
                  <Button asChild variant="outline">
                    <a href={telHref(business.phone)}>
                      <Phone /> {business.phone}
                    </a>
                  </Button>
                  <Button asChild>
                    <Link to="/quote">
                      Start the wizard <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
