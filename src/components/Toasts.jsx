import { CheckCircle2 } from "lucide-react";

export function Toasts({ items }) {
  return (
    <div className="fixed bottom-5 right-5 z-70 flex max-w-[calc(100vw-2.5rem)] flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs text-white shadow-xl ${item.tone === "red" ? "bg-rose-700/95" : item.tone === "green" ? "bg-emerald-700/95" : "bg-slate-900/95"}`}
        >
          <CheckCircle2 size={14} />
          <span>{item.message}</span>
        </div>
      ))}
    </div>
  );
}
