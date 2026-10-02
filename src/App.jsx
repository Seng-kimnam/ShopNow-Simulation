import { useEffect, useState } from "react";
import { earbudCatalog, formatFreshness, initialState, merchantCatalog } from "./data";
import { phoneSummary, telemetry } from "./utils/simulator";
import { Modal } from "./components/Modals";
import { Phone } from "./components/Phone";
import { Telemetry } from "./components/Telemetry";
import { Toasts } from "./components/Toasts";
import { TopBar } from "./components/TopBar";

export default function App() {
  const [state, setState] = useState(initialState);
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const summary = phoneSummary(state);
  const metrics = telemetry(state);

  // Simulates the marketplace price adapter refreshing its cache. Keeping the
  // timestamp in state makes freshness visible without re-rendering on every
  // second or changing a shopper's total unexpectedly.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setState((current) => ({ ...current, pricingUpdatedAt: Date.now() }));
    }, 15000);
    return () => window.clearInterval(interval);
  }, []);

  const toast = (message, tone = "orange") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(
      () => setToasts((current) => current.filter((item) => item.id !== id)),
      2600,
    );
  };

  const changeMode = (mode) => {
    setState((current) => ({ ...current, mode }));
    toast(
      mode === "legacy"
        ? "Legacy flow enabled"
        : "ShopNow 2.0 optimizer enabled",
    );
  };

  const changeScenario = (scenario) => {
    setState((current) => ({ ...current, scenario }));
    toast(`Scenario ${scenario} loaded`);
  };

  const updateQuantity = (id, delta) => {
    setState((current) => ({
      ...current,
      carts: {
        ...current.carts,
        [current.scenario]: current.carts[current.scenario]
          .map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
          .filter((item) => item.qty > 0),
      },
      winnerPicked: current.scenario === 1 ? false : current.winnerPicked,
    }));
  };

  const addToCart = (item, targetScenario = null) => {
    setState((current) => {
      const scenario = targetScenario ?? current.scenario;
      const cart = current.carts[scenario] ?? [];
      const existing = cart.find((cartItem) => cartItem.id === item.id);
      return {
        ...current,
        scenario,
        carts: {
          ...current.carts,
          [scenario]: existing
            ? cart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem)
            : [...cart, { ...item, qty: 1 }],
        },
        winnerPicked: scenario === 1 ? false : current.winnerPicked,
      };
    });
    toast(`${item.name} added to cart`, "green");
  };

  const removeFromCart = (id) => updateQuantity(id, -999);

  const reset = () => {
    setState({ ...initialState, pricingUpdatedAt: Date.now() });
    setModal(null);
    toast("Simulator reset to initial state");
  };

  const chooseWinner = (name, price) => {
    setState((current) => ({
      ...current,
      winnerPicked: true,
      winnerName: name,
      winnerPrice: price,
    }));
    setModal(null);
    toast(`Winner picked: ${name}`, "green");
  };

  const consolidate = () => {
    setState((current) => ({ ...current, consolidated: true }));
    toast("Consolidated into Central Hub. Free shipping.", "green");
  };

  const purge = () => {
    setState((current) => ({ ...current, purged: true }));
    setModal(null);
    toast("Cart deleted due to surprise delivery fees", "red");
  };

  const checkout = () => {
    if (state.scenario === 2 && state.mode === "optimized" && !state.consolidated) {
      toast("Please tap 1-Tap Consolidate before checkout to combine shipping.", "orange");
      return;
    }
    if (state.scenario === 2 && state.mode === "legacy") setModal("shock");
    else toast(`Instant checkout success. Total: $${summary.total.toFixed(2)}`, "green");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-3 font-sans text-slate-800 antialiased selection:bg-orange-500 selection:text-white sm:px-6">
      <TopBar
        state={state}
        onModeChange={changeMode}
        onScenarioChange={changeScenario}
        onOpenInsights={() => setModal("insights")}
      />
      <main id="smart-cart" className="mx-auto flex w-full max-w-6xl scroll-mt-5 flex-col items-start justify-center gap-8 pb-12 lg:flex-row">
        <Phone
          state={state}
          summary={summary}
          onReset={reset}
          onCheckout={checkout}
          onOpenModal={setModal}
          onConsolidate={consolidate}
          onSetState={setState}
          pricingFreshness={formatFreshness(state.pricingUpdatedAt)}
          onUpdateQuantity={updateQuantity}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          catalog={state.scenario === 1 ? earbudCatalog : merchantCatalog}
        />
        <Telemetry state={state} metrics={metrics} />
      </main>
      {modal && (
        <Modal
          type={modal}
          onClose={() => setModal(null)}
          onChooseWinner={chooseWinner}
          onPurge={purge}
        />
      )}
      <Toasts items={toasts} />
    </div>
  );
}
