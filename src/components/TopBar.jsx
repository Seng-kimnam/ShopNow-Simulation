import { BookOpen, Box } from "lucide-react";
import { Button } from "./ui";

export function TopBar({
  state,
  onModeChange,
  onScenarioChange,
  onOpenInsights,
}) {
  return (
    <header className="mx-auto mb-6 flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-shopee text-white shadow-md shadow-shopee/30">
          <Box size={19} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-black tracking-tight text-slate-900">
              ShopNow <span className="text-shopee">Simulator</span>
            </h1>
            <span className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-shopee">
              Light Mode SEA
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500">
            Smart Choice + True Cost • AI recommendations • Live landed pricing
          </p>
        </div>
      </div>
      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs">
        <ModeButton
          active={state.mode === "legacy"}
          onClick={() => onModeChange("legacy")}
          dot="bg-rose-500"
        >
          Legacy (Broken Flow)
        </ModeButton>
        <ModeButton
          active={state.mode === "optimized"}
          onClick={() => onModeChange("optimized")}
          dot="bg-emerald-500"
        >
          ShopNow 2.0 (Optimized)
        </ModeButton>
      </div>
      <div className="no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto text-xs">
        <ScenarioButton
          active={state.scenario === 1}
          onClick={() => onScenarioChange(1)}
        >
          🎧 Scenario 1: Earbud Choice Paralysis
        </ScenarioButton>
        <ScenarioButton
          active={state.scenario === 2}
          onClick={() => onScenarioChange(2)}
        >
          📦 Scenario 2: Split Shipping Shock
        </ScenarioButton>
        <Button
          onClick={onOpenInsights}
          className="whitespace-nowrap rounded-xl border border-orange-200 bg-orange-50 px-3 py-1.5 font-bold text-shopee hover:bg-orange-100"
        >
          <BookOpen size={13} className="mr-1 inline" /> Behavioral Deck
        </Button>
      </div>
    </header>
  );
}

function ModeButton({ active, dot, children, onClick }) {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-bold ${active ? "border border-slate-200 bg-white text-shopee shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {children}
    </Button>
  );
}
function ScenarioButton({ active, children, onClick }) {
  return (
    <Button
      onClick={onClick}
      className={`whitespace-nowrap rounded-xl px-3 py-1.5 font-bold ${active ? "bg-slate-900 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
    >
      {children}
    </Button>
  );
}
