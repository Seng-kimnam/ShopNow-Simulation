import { useState } from "react";
import { initialState } from "./data";
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

  const reset = () => {
    setState(initialState);
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
    if (state.scenario === 2 && state.mode === "legacy") setModal("shock");
    else
      toast(
        `Instant checkout success. Total: $${summary.total.toFixed(2)}`,
        "green",
      );
  };

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-3 font-sans text-slate-800 antialiased selection:bg-orange-500 selection:text-white sm:px-6">
      <TopBar
        state={state}
        onModeChange={changeMode}
        onScenarioChange={changeScenario}
        onOpenInsights={() => setModal("insights")}
      />
      <main className="mx-auto flex w-full max-w-6xl flex-col items-start justify-center gap-8 pb-12 lg:flex-row">
        <Phone
          state={state}
          summary={summary}
          onReset={reset}
          onCheckout={checkout}
          onOpenModal={setModal}
          onConsolidate={consolidate}
          onSetState={setState}
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
