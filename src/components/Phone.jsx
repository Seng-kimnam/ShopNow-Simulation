import {
  ArrowLeft,
  BatteryFull,
  Check,
  CircleCheck,
  Signal,
  TriangleAlert,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { ScenarioOne, ScenarioTwo } from "./CartContent";
import { HomeListing } from "./HomeListing";
import { Button, Price } from "./ui";

export function Phone({
  state,
  summary,
  onReset,
  onCheckout,
  onOpenModal,
  onConsolidate,
  onSetState,
  pricingFreshness,
  onUpdateQuantity,
  onAddToCart,
  onRemoveFromCart,
  catalog,
}) {
  const [view, setView] = useState("listing");
  const optimized = state.mode === "optimized";
  const products = catalog;
  const cart = state.carts?.[state.scenario] ?? [];
  const handleCheckout = () => {
    setView("cart");
    onCheckout();
  };
  return (
    <div className="relative mx-auto flex shrink-0 flex-col items-center lg:mx-0">
      <div className="mb-2 flex w-full max-w-97.5 items-center justify-between px-2 text-xs font-semibold">
        <span
          className={`flex items-center gap-2 my-4 font-bold ${optimized ? "text-shopee" : "text-rose-500"}`}
        >
          {optimized ? <CircleCheck size={13} /> : <TriangleAlert size={13} />}{" "}
          {optimized
            ? "ShopNow 2.0 • Decision Engine Active"
            : "Legacy Mode • High Drop-Off"}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] ${optimized ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-rose-200 bg-rose-50 text-rose-600"}`}
        >
          {optimized ? "Optimal Conversion" : "Severe Paralysis"}
        </span>
      </div>
      <div className="phone-frame relative flex h-205 w-97.5 select-none flex-col overflow-hidden rounded-phone bg-white shadow-phone">
        <StatusBar />
        <PhoneHeader count={summary.count} onReset={onReset} pricingFreshness={pricingFreshness} view={view} onBack={() => setView("listing")} />
        <div className="no-scrollbar flex-1 space-y-2.5 overflow-y-auto bg-app-bg p-2.5">
          {view === "listing" ? <HomeListing
            products={products}
            cart={cart}
            compact
            onAddToCart={(item) => onAddToCart(item, state.scenario)}
            onViewCart={() => setView("cart")}
          /> : state.scenario === 1 ? (
            <ScenarioOne
              state={state}
              onOpenModal={onOpenModal}
              onSetState={onSetState}
              onUpdateQuantity={onUpdateQuantity}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              catalog={catalog}
            />
          ) : (
            <ScenarioTwo
              state={state}
              onConsolidate={onConsolidate}
              onSetState={onSetState}
              onUpdateQuantity={onUpdateQuantity}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              catalog={catalog}
            />
          )}
        </div>
        <CheckoutBar summary={summary} onCheckout={handleCheckout} view={view} />
        <div className="flex h-3 shrink-0 items-center justify-center bg-white">
          <div className="h-1 w-32 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-7 pt-2 text-xs font-bold text-slate-900">
      <span>9:41</span>
      <div className="flex h-5 w-24 items-center justify-end gap-1 rounded-full bg-black px-2">
        <span className="h-2 w-2 rounded-full bg-slate-800" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-shopee" />
      </div>
      <div className="flex items-center gap-1.5 text-slate-800">
        <Signal size={11} />
        <Wifi size={11} />
        <BatteryFull size={14} />
      </div>
    </div>
  );
}
function PhoneHeader({ count, onReset, pricingFreshness, view, onBack }) {
  return (
    <div className="z-20 flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-2.5">
      <div className="flex items-center gap-3">
          <Button onClick={onBack} aria-label="Back to product listing" className="text-slate-700 hover:text-slate-900">
          <ArrowLeft size={16} />
        </Button>
        <div>
          <div className="flex items-baseline gap-1.5">
            <h2 className="text-base font-bold text-slate-900">{view === "listing" ? "ShopNow" : "Smart Cart"}</h2>
            <span className="text-xs font-medium text-slate-400">({count})</span>
          </div>
          <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Prices checked {pricingFreshness}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="cursor-pointer text-xs font-medium text-slate-600">
          Edit
        </span>
        <Button
          onClick={onReset}
          className="text-xs font-bold text-shopee hover:text-shopee-dark"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
function CheckoutBar({ summary, onCheckout, view }) {
  return (
    <div className="z-30 flex shrink-0 items-center justify-between border-t border-slate-200 bg-white px-3.5 py-2.5 shadow-checkout-bar">
      <Button className="flex items-center gap-2 text-xs font-semibold text-slate-700">
        <span className="flex h-4 w-4 items-center justify-center rounded-md border border-shopee bg-shopee text-white">
          <Check size={11} />
        </span>
        All
      </Button>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="flex items-baseline justify-end">
            <span className="mr-1 text-[11px] font-medium text-slate-600">
              Total:
            </span>
            <Price value={summary.total} />
          </div>
          <span className="mt-0.5 block text-[9px] font-semibold leading-none text-shopee">
            {summary.savings}
          </span>
        </div>
        <Button
          onClick={onCheckout}
          className="flex items-center gap-1 rounded-full bg-shopee px-6 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-shopee-dark"
        >
          {view === "listing" ? "View cart" : "Checkout"}{" "}
          <span className="text-[11px] font-medium">({summary.count})</span>
        </Button>
      </div>
    </div>
  );
}
