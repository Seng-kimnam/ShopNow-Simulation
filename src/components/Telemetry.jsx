import { Lightbulb, Microchip } from "lucide-react";

export function Telemetry({ state, metrics }) {
  return (
    <aside className="flex w-full max-w-xl flex-1 flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${state.scenario === 1 ? "border-orange-200 bg-orange-50 text-shopee" : "border-rose-200 bg-rose-50 text-rose-700"}`}
          >
            {metrics.principle}
          </span>
          <span className="whitespace-nowrap text-xs font-medium text-slate-400">
            Telemetry & Strategy Hub
          </span>
        </div>
        <h3 className="text-lg font-black leading-snug text-slate-900">
          {metrics.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          {metrics.description}
        </p>
      </div>
      <div className="space-y-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
            Live Funnel Telemetry
          </h4>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />{" "}
            Real-Time Monitor
          </span>
        </div>
        {metrics.gauges.map((item) => (
          <Gauge key={item.label} {...item} />
        ))}
      </div>
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs">
        <h4 className="flex items-center gap-1.5 font-extrabold text-slate-900">
          <Microchip size={14} className="text-shopee" /> Engine Intervention
          Architecture
        </h4>
        {metrics.points.map((point) => (
          <div key={point.title} className="flex items-start gap-2">
            <span
              className={`text-sm font-bold leading-none ${state.mode === "legacy" ? "text-rose-500" : "text-shopee"}`}
            >
              •
            </span>
            <div>
              <strong className="block font-semibold text-slate-900">
                {point.title}
              </strong>
              <span className="text-slate-500">{point.body}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-2.5 rounded-2xl border border-orange-200 bg-orange-50 p-3.5 text-xs text-orange-950">
        <Lightbulb size={15} className="mt-0.5 shrink-0 text-shopee" />
        <div className="leading-relaxed">
          <strong>Interactive Test Guide:</strong> Toggle modes and scenarios to
          observe how price consolidation and the 3-Second Showdown affect cart
          hesitation.
        </div>
      </div>
    </aside>
  );
}

function Gauge({ label, text, value, tone }) {
  return (
    <div>
      <div className="mb-1 flex justify-between gap-3 text-xs font-semibold">
        <span className="text-slate-600">{label}</span>
        <span className={`font-black ${tone}`}>{text}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${tone.includes("emerald") ? "bg-emerald-500" : tone.includes("amber") ? "bg-amber-500" : "bg-rose-500"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
