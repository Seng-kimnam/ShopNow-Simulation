import {
  Box,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  LockKeyhole,
  Sparkles,
  Trash2,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { merchants, scenario1Items } from "../data";
import { Button } from "./ui";

export function ScenarioOne({ state, onOpenModal, onSetState }) {
  if (state.mode === "legacy")
    return (
      <div className="space-y-2.5">
        <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
          <TriangleAlert size={14} className="mt-0.5 shrink-0 text-rose-500" />
          <div>
            <strong className="block text-slate-900">
              Choice Overload: 4 earbuds in cart ($94.60)
            </strong>
            <span>Undifferentiated specs trigger 84% abandonment.</span>
          </div>
        </div>
        <StoreCard />
      </div>
    );
  if (state.winnerPicked)
    return <WinnerState state={state} onSetState={onSetState} />;
  return (
    <div className="space-y-2.5">
      <div className="flex items-start gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-900">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Sparkles size={15} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-extrabold text-slate-900">
              3-Sec Head-to-Head Showdown
            </h4>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
              98% Match
            </span>
          </div>
          <p className="mt-1 leading-relaxed">
            We found the best match from your 4 earbuds. Compare real microphone
            clarity, battery, and return data.
          </p>
          <Button
            onClick={() => onOpenModal("showdown")}
            className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-shopee py-2 text-xs font-extrabold text-white shadow-md hover:bg-shopee-dark"
          >
            <Zap size={13} /> Compare top 2 choices
          </Button>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-3 text-xs opacity-75">
        <span className="text-[11px] font-bold text-slate-500">
          Other options moved to comparison bench
        </span>
        {scenario1Items.slice(1).map((item) => (
          <div
            key={item[1]}
            className="flex items-center justify-between border-b border-slate-50 py-2 last:border-0"
          >
            <span>
              {item[0]} {item[1].split(" ")[0]}...
            </span>
            <span className="text-slate-500">${item[3]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScenarioTwo({ state, onConsolidate, onSetState }) {
  if (state.mode === "legacy")
    return state.purged ? (
      <div className="space-y-2.5">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center">
          <Trash2 className="mx-auto mb-2 text-rose-500" size={26} />
          <h4 className="text-sm font-black text-rose-800">Cart Purged</h4>
          <p className="mt-1 text-xs text-rose-700">
            The price shock caused a spite purge.
          </p>
          <Button
            onClick={() =>
              onSetState((current) => ({ ...current, purged: false }))
            }
            className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm"
          >
            Restore cart
          </Button>
        </div>
      </div>
    ) : (
      <div className="space-y-2.5">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
          <div className="flex items-center gap-2 font-black text-slate-900">
            <CircleAlert size={15} className="text-rose-600" /> Split shipping
            fees hidden until checkout
          </div>
          <p className="mt-1.5 leading-relaxed">
            Three overseas sellers turn this $15.00 cart into a $28.80 surprise
            at step 4.
          </p>
        </div>
        <MerchantCards />
      </div>
    );
  if (state.consolidated)
    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 p-2.5 text-xs text-emerald-900">
          <span className="flex items-center gap-1.5 font-bold">
            <CircleCheck size={14} className="text-emerald-600" /> Consolidated
            into 1 Local Hub Box
          </span>
          <Button
            onClick={() =>
              onSetState((current) => ({ ...current, consolidated: false }))
            }
            className="text-[10px] text-slate-500 hover:underline"
          >
            Revert
          </Button>
        </div>
        <div className="space-y-2.5 rounded-2xl border-2 border-emerald-400 bg-white p-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
            <span className="font-bold text-slate-900">
              ShopNow FastFulfill Central Hub
            </span>
            <span className="text-[10px] font-bold text-emerald-600">
              FREE Delivery
            </span>
          </div>
          {merchants.map(([emoji, name, , price]) => (
            <div
              key={name}
              className="flex items-center justify-between border-b border-slate-100 py-2 text-xs last:border-0"
            >
              <span className="flex items-center gap-2 font-medium text-slate-800">
                <span className="text-xl">{emoji}</span>
                {name.split(" (")[0]}
              </span>
              <span className="font-black text-shopee">${price}</span>
            </div>
          ))}
          <div className="space-y-1 border-t border-slate-100 pt-2 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal:</span>
              <b>$15.00</b>
            </div>
            <div className="flex justify-between font-bold text-emerald-600">
              <span>Unified Box Shipping:</span>
              <span>FREE (Saved $12.50)</span>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="space-y-2.5">
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-3">
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <Box size={15} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-extrabold text-slate-900">
                1-Tap Basket Optimizer
              </h4>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                Free Combined Box
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              All 3 items are available from the{" "}
              <b>ShopNow Regional Central Hub</b>. Consolidate into 1 shipment
              for $0 combined delivery.
            </p>
            <Button
              onClick={onConsolidate}
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2 text-xs font-extrabold text-white shadow-md hover:bg-emerald-700"
            >
              <Sparkles size={13} /> 1-Tap Consolidate (Save $12.50)
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-3 text-xs opacity-75">
        <span className="text-[11px] font-bold text-slate-500">
          Unconsolidated Overseas Fees:
        </span>
        {merchants.map(([emoji, name, , , fee]) => (
          <div
            key={name}
            className="flex justify-between border-b border-slate-50 py-1 last:border-0"
          >
            <span>
              {emoji} {name.split(" (")[0]}
            </span>
            <span className="font-semibold text-rose-500">+${fee}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreCard() {
  return (
    <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="rounded bg-mall-red px-1.5 py-0.5 text-[9px] font-black text-white">
            Mall
          </span>
          <b>SoundHub Official Store</b>
          <ChevronRight size={11} className="text-slate-400" />
        </span>
        <span className="font-semibold text-shopee">Vouchers</span>
      </div>
      {scenario1Items.map(([emoji, name, meta, price]) => (
        <div
          key={name}
          className="flex items-start gap-2.5 border-b border-slate-50 py-1 last:border-0"
        >
          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border border-shopee bg-shopee text-[9px] text-white">
            ✓
          </span>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl">
            {emoji}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-xs font-semibold text-slate-900">
              {name}
            </h4>
            <div className="my-0.5 text-[10px] text-slate-400">{meta}</div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs font-black text-shopee">${price}</span>
              <span className="rounded border border-slate-200 px-1.5 py-0.5 text-[11px]">
                − &nbsp;1&nbsp; +
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MerchantCards() {
  return (
    <div className="space-y-2.5">
      {merchants.map(([emoji, name, seller, price, fee]) => (
        <div
          key={seller}
          className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
        >
          <div className="flex justify-between border-b border-slate-100 pb-1.5 text-xs font-semibold">
            <span className="text-slate-800">{seller}</span>
            <span className="text-[10px] text-slate-400">Overseas +${fee}</span>
          </div>
          <div className="flex items-center gap-2.5 pt-2">
            <span className="text-2xl">{emoji}</span>
            <div className="min-w-0 flex-1">
              <h5 className="truncate text-xs font-semibold text-slate-900">
                {name}
              </h5>
              <span className="mt-0.5 block text-xs font-black text-shopee">
                ${price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WinnerState({ state, onSetState }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 p-2.5 text-xs text-emerald-900">
        <CircleCheck size={15} className="text-emerald-600" />
        <span className="font-bold">Decision locked: {state.winnerName}</span>
      </div>
      <div className="rounded-2xl border-2 border-shopee bg-white p-3">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl">🎧</span>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-slate-900">
              {state.winnerName}
            </h4>
            <p className="text-[10px] text-slate-500">
              Top match • 9.4/10 mic clarity • 30 hours
            </p>
            <span className="mt-1 block text-sm font-black text-shopee">
              ${state.winnerPrice.toFixed(2)}
            </span>
          </div>
          <LockKeyhole size={16} className="text-emerald-600" />
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500">
          <span>3 runners-up benched</span>
          <Button
            onClick={() =>
              onSetState((current) => ({ ...current, winnerPicked: false }))
            }
            className="font-semibold text-shopee hover:underline"
          >
            Compare again
          </Button>
        </div>
      </div>
    </div>
  );
}
