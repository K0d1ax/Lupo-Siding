import * as React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Flame,
  KeyRound,
  Loader2,
  LogOut,
  Phone,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NeonPanel } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/input";
import { AuroraBackdrop } from "@/components/site/Backdrop";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { isBackendConnected } from "@/lib/convex";
import { readLocalLeads, serviceOptions } from "@/lib/quote";
import { business } from "@/content/site";
import { cn, telHref } from "@/lib/utils";

type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];

const statusStyle: Record<LeadStatus, string> = {
  new: "border-flare/45 bg-flare/10 text-flare-soft",
  contacted: "border-glacier/45 bg-glacier/10 text-glacier-soft",
  quoted: "border-neon/45 bg-neon/10 text-neon",
  won: "border-emerald-400/45 bg-emerald-400/10 text-emerald-300",
  lost: "border-white/15 bg-white/[0.04] text-muted-foreground",
};

function formatWhen(ts: number) {
  return new Date(ts).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function scoreTone(score: number) {
  if (score >= 75) return "text-flare-soft";
  if (score >= 55) return "text-neon-soft";
  return "text-muted-foreground";
}

/** Keeps a bad access code from blowing up the whole page. */
class QueryBoundary extends React.Component<
  { children: React.ReactNode; onInvalid: () => void },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode; onInvalid: () => void }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <NeonPanel className="p-7 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl border border-destructive/45 bg-destructive/10 text-destructive-foreground">
            <AlertTriangle className="size-5" />
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold">That code did not work</h2>
          <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
            {this.state.error.message}
          </p>
          <Button className="mt-6" onClick={this.props.onInvalid}>
            Try again
          </Button>
        </NeonPanel>
      );
    }
    return this.props.children;
  }
}

function Passcode({ onSubmit, hint }: { onSubmit: (code: string) => void; hint?: string }) {
  const [value, setValue] = React.useState("");

  return (
    <NeonPanel strong className="mx-auto max-w-md p-7">
      <span className="grid size-12 place-items-center rounded-xl border border-neon/45 bg-neon/[0.09] text-neon-soft">
        <KeyRound className="size-5" />
      </span>
      <h1 className="mt-5 font-display text-xl font-semibold">Owner portal</h1>
      <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
        {hint ?? "Enter your access code to see incoming quote requests. The code is checked on the server and is never stored in the site itself."}
      </p>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (value.trim().length >= 6) onSubmit(value.trim());
        }}
      >
        <Field label="Access code" htmlFor="passcode">
          <Input
            id="passcode"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Field>
        <Button type="submit" size="lg" disabled={value.trim().length < 6}>
          <ShieldCheck /> Unlock
        </Button>
      </form>
    </NeonPanel>
  );
}

function KpiCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  tone?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <span className={cn("text-neon-soft", tone)}>{icon}</span>
      </div>
      <p className={cn("mt-3 font-display text-[1.9rem] font-semibold leading-none", tone)}>{value}</p>
    </div>
  );
}

function LeadCard({ lead, code }: { lead: Doc<"leads">; code: string }) {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState("");
  const updateStatus = useMutation(api.leads.updateStatus);
  const addNote = useMutation(api.leads.addNote);
  const removeLead = useMutation(api.leads.remove);
  const notes = useQuery(api.leads.notes, open ? { code, leadId: lead._id } : "skip");

  const status = lead.status as LeadStatus;

  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.02] transition-colors hover:border-white/20">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em]",
                statusStyle[status],
              )}
            >
              {status}
            </span>
            <span className={cn("font-mono text-[10px] uppercase tracking-[0.16em]", scoreTone(lead.score))}>
              Score {lead.score}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {formatWhen(lead.createdAt)}
            </span>
          </div>

          <h3 className="mt-3 font-display text-[1.05rem] font-semibold">{lead.name}</h3>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {[lead.street, lead.city, lead.zip].filter(Boolean).join(", ") || lead.city}
            <span className="mx-2 text-white/15">/</span>
            {lead.services
              .map((s) => serviceOptions.find((o) => o.value === s)?.title ?? s)
              .join(" · ")}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-muted-foreground">
            <a href={`mailto:${lead.email}`} className="transition-colors hover:text-neon-soft">
              {lead.email}
            </a>
            <a href={telHref(lead.phone)} className="flex items-center gap-1.5 transition-colors hover:text-neon-soft">
              <Phone className="size-3" /> {lead.phone}
            </a>
            <span>Prefers {lead.preferredContact}</span>
            {lead.insuranceClaim ? <Badge variant="flare">Insurance</Badge> : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <a
            href={`tel:+1${lead.phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-neon/45 bg-neon/[0.08] px-3.5 py-2 text-[12.5px] font-medium text-neon-soft transition-colors hover:bg-neon/[0.16]"
          >
            <Phone className="size-3.5" /> Call
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {open ? "Hide" : "Open"}
            <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/[0.08] bg-white/[0.015] p-5">
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { k: "Property", v: lead.propertyType },
              { k: "Stories", v: lead.stories },
              { k: "Home age", v: lead.homeAge },
              { k: "Timeline", v: lead.timeline },
              { k: "Budget", v: lead.budget ?? "—" },
              { k: "Siding material", v: lead.sidingMaterial ?? "—" },
              { k: "Reason", v: lead.sidingReason ?? "—" },
              { k: "Gutter length", v: lead.gutterLinearFeet ?? "—" },
              { k: "Deck size", v: lead.deckSize ?? "—" },
            ].map((row) => (
              <div key={row.k}>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">{row.k}</dt>
                <dd className="mt-1 text-[13px]">{row.v}</dd>
              </div>
            ))}
          </dl>

          {lead.gutterIssues?.length ? (
            <p className="mt-5 text-[13px]">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
                Gutter issues:{" "}
              </span>
              {lead.gutterIssues.join(", ")}
            </p>
          ) : null}

          {lead.notes ? (
            <p className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-[13px] leading-relaxed text-muted-foreground">
              {lead.notes}
            </p>
          ) : null}

          {/* pipeline */}
          <div className="mt-6">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Pipeline</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STATUS_ORDER.map((next) => (
                <button
                  key={next}
                  type="button"
                  onClick={() => updateStatus({ code, leadId: lead._id, status: next })}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all",
                    next === status
                      ? statusStyle[next]
                      : "border-white/12 bg-white/[0.03] text-muted-foreground hover:border-neon/40 hover:text-foreground",
                  )}
                >
                  {next === status ? <Check className="size-3" /> : null}
                  {next}
                </button>
              ))}
            </div>
          </div>

          {/* notes */}
          <div className="mt-6">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Internal notes</p>
            <ul className="mt-3 space-y-2">
              {notes === undefined ? (
                <li className="text-[12.5px] text-muted-foreground">Loading…</li>
              ) : notes.length === 0 ? (
                <li className="text-[12.5px] text-muted-foreground">No notes yet.</li>
              ) : (
                notes.map((entry) => (
                  <li key={entry._id} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-[12.5px]">
                    <span className="block text-foreground/90">{entry.body}</span>
                    <span className="mt-1.5 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      {formatWhen(entry.createdAt)}
                    </span>
                  </li>
                ))
              )}
            </ul>

            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
              onSubmit={async (event) => {
                event.preventDefault();
                if (note.trim().length < 2) return;
                await addNote({ code, leadId: lead._id, body: note.trim() });
                setNote("");
              }}
            >
              <Field label="Add a note" htmlFor={`note-${lead._id}`} className="flex-1">
                <Textarea
                  id={`note-${lead._id}`}
                  rows={2}
                  placeholder="Called, left a voicemail. Following up Thursday."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  className="min-h-16"
                />
              </Field>
              <Button type="submit" variant="outline" disabled={note.trim().length < 2}>
                Save note
              </Button>
            </form>
          </div>

          <button
            type="button"
            onClick={() => removeLead({ code, leadId: lead._id })}
            className="mt-6 inline-flex items-center gap-2 text-[12px] text-muted-foreground transition-colors hover:text-destructive-foreground"
          >
            <Trash2 className="size-3.5" /> Delete this lead
          </button>
        </div>
      ) : null}
    </article>
  );
}

function LeadsDashboard({ code, onSignOut }: { code: string; onSignOut: () => void }) {
  const [status, setStatus] = React.useState<LeadStatus | "all">("all");
  const [search, setSearch] = React.useState("");
  const [term, setTerm] = React.useState("");

  // Debounce the free-text filter so we are not querying on every keystroke.
  React.useEffect(() => {
    const id = window.setTimeout(() => setTerm(search), 280);
    return () => window.clearTimeout(id);
  }, [search]);

  const kpis = useQuery(api.leads.stats, { code });
  const rows = useQuery(api.leads.list, {
    code,
    status: status === "all" ? undefined : status,
    query: term || undefined,
  });

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold">Quote pipeline</h1>
          <p className="mt-1.5 text-[13.5px] text-muted-foreground">
            Live from the website wizard. Updates appear here the moment a homeowner submits.
          </p>
        </div>
        <Button variant="ghost" onClick={onSignOut}>
          <LogOut /> Lock portal
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total requests" value={kpis?.total ?? "—"} icon={<Users className="size-4" />} />
        <KpiCard
          label="New / unworked"
          value={kpis?.unworked ?? "—"}
          icon={<Flame className="size-4" />}
          tone="text-flare-soft"
        />
        <KpiCard label="Last 7 days" value={kpis?.lastSevenDays ?? "—"} icon={<TrendingUp className="size-4" />} />
        <KpiCard
          label="Hot leads (75+)"
          value={kpis?.hot ?? "—"}
          icon={<Flame className="size-4" />}
          tone="text-neon-soft"
        />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
        <div className="flex flex-wrap items-center gap-2">
          {(["all", ...STATUS_ORDER] as const).map((option) => {
            const count = option === "all" ? kpis?.total : kpis?.byStatus?.[option];
            const active = status === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all",
                  active
                    ? "border-neon/60 bg-neon/[0.12] text-neon"
                    : "border-white/12 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground",
                )}
              >
                {option}
                {count !== undefined ? <span className="text-muted-foreground/70">{count}</span> : null}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, phone, email, address or notes"
            className="pl-11"
            aria-label="Search leads"
          />
        </div>
      </div>

      {rows === undefined ? (
        <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" /> Loading leads…
        </div>
      ) : rows.length === 0 ? (
        <NeonPanel className="p-10 text-center">
          <h2 className="font-display text-lg font-semibold">No leads match that yet</h2>
          <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
            Submit a test request through the quote wizard and it will appear here instantly — Convex subscriptions push
            updates without a refresh.
          </p>
          <Button asChild className="mt-6">
            <Link to="/quote">
              Open the wizard <ArrowRight />
            </Link>
          </Button>
        </NeonPanel>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((lead) => (
            <LeadCard key={lead._id} lead={lead} code={code} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Reads leads cached in this browser when no Convex deployment is configured. */
function OfflinePortal() {
  const leads = readLocalLeads();

  return (
    <div className="flex flex-col gap-7">
      <NeonPanel className="p-6">
        <Badge variant="flare">
          <AlertTriangle className="size-3" /> Offline preview mode
        </Badge>
        <h1 className="mt-4 font-display text-xl font-semibold">No backend connected</h1>
        <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
          This workspace has no Convex deployment URL configured, so requests are being written to this browser only.
          Connect a deployment to store leads permanently and see them from any device.
        </p>
      </NeonPanel>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {leads.length} locally cached {leads.length === 1 ? "request" : "requests"}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {leads.length === 0 ? (
            <p className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-[13.5px] text-muted-foreground">
              Nothing cached yet. Run the quote wizard to see it here.
            </p>
          ) : (
            leads.map((lead, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-[1rem] font-semibold">{lead.name || "Unnamed"}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {formatWhen(lead.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-[13px] text-muted-foreground">
                  {[lead.city, lead.phone, lead.email].filter(Boolean).join(" · ")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ConnectedPortal() {
  const status = useQuery(api.leads.portalStatus, {});
  const [code, setCode] = React.useState<string>(() => window.sessionStorage.getItem("lupo.owner.code") ?? "");

  function unlock(next: string) {
    window.sessionStorage.setItem("lupo.owner.code", next);
    setCode(next);
  }

  function lock() {
    window.sessionStorage.removeItem("lupo.owner.code");
    setCode("");
  }

  if (status && !status.configured) {
    return (
      <NeonPanel className="mx-auto max-w-2xl p-7">
        <Badge variant="flare">
          <AlertTriangle className="size-3" /> One setup step left
        </Badge>
        <h1 className="mt-4 font-display text-xl font-semibold">Set an owner access code</h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
          The portal is built and waiting. To protect your customers' details, set a long access code on the Convex
          deployment — it lives only on the server and is never bundled into the website.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-xl border border-neon/25 bg-[hsl(220_30%_4%)] p-4 font-mono text-[12px] text-neon-soft">
          bunx convex env set OWNER_ACCESS_CODE "pick-a-long-random-string"
        </pre>
        <p className="mt-4 text-[12.5px] text-muted-foreground">
          Set the same variable in your production Convex deployment before launch.
        </p>
      </NeonPanel>
    );
  }

  if (!code) {
    return <Passcode onSubmit={unlock} />;
  }

  return (
    <QueryBoundary onInvalid={lock}>
      <LeadsDashboard code={code} onSignOut={lock} />
    </QueryBoundary>
  );
}

export function PortalPage() {
  return (
    <div className="relative isolate min-h-[80vh] overflow-hidden pb-24 pt-14 sm:pt-16">
      <AuroraBackdrop />
      <div className="container relative">
        {isBackendConnected ? <ConnectedPortal /> : <OfflinePortal />}

        <p className="mt-10 text-center text-[12px] text-muted-foreground">
          Not the owner?{" "}
          <Link to="/quote" className="text-neon-soft underline-offset-2 hover:underline">
            Get a free quote
          </Link>{" "}
          or call{" "}
          <a href={telHref(business.phone)} className="text-neon-soft underline-offset-2 hover:underline">
            {business.phone}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
