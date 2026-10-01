import {
  GraduationCap,
  Sparkles,
  Trash2,
  TriangleAlert,
  X,
  Zap,
} from "lucide-react";
import { Button, Overlay } from "./ui";

export function Modal({ type, onClose, onChooseWinner, onPurge }) {
  if (type === "insights")
    return (
      <Overlay onClose={onClose}>
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
          <ModalHeader
            icon={<GraduationCap size={17} />}
            title="ShopNow Behavioral Strategy Deck"
            subtitle="Why Gen Z Shoppers Abandon & How 2.0 Solves It"
            onClose={onClose}
          />
          <div className="mt-4 space-y-4 text-xs leading-relaxed text-slate-700">
            <DeckCard title="1. Barry Schwartz's Paradox of Choice (The Earbud Dilemma)">
              When a buyer puts 4 pairs of $20 earbuds in their cart, the cart
              becomes an anxious scratchpad. ShopNow 2.0's{" "}
              <b>3-Second Showdown</b> forces an objective comparison and
              benches the runners-up.
            </DeckCard>
            <DeckCard title="2. Richard Thaler's Transaction Utility (The Spite Purge)">
              When a $15 basket jumps to $28.80 because of split overseas
              shipping, the deal feels ruined. The{" "}
              <b>1-Tap Central Hub Optimizer</b> keeps the bargain intact.
            </DeckCard>
            <DeckCard title="3. The Anchoring Violation (Drip Pricing Breakdown)">
              Marketplaces reveal fragmented carrier fees at checkout.
              Disclosing them earlier protects the user's initial price anchor.
            </DeckCard>
          </div>
          <Button
            onClick={onClose}
            className="mt-5 w-full rounded-full bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
          >
            Close Deck
          </Button>
        </div>
      </Overlay>
    );
  if (type === "shock")
    return (
      <Overlay onClose={onClose}>
        <div className="w-full max-w-97.5 rounded-t-7 bg-white p-5 shadow-2xl">
          <ModalHeader
            icon={<TriangleAlert size={17} />}
            title="Split Shipping Shock at Step 4"
            subtitle="Your 3 impulse items are from separate overseas sellers"
            onClose={onClose}
          />
          <div className="my-3 space-y-1.5 rounded-2xl border border-rose-200 bg-rose-50/70 p-3 text-xs">
            <Row label="Items Subtotal" value="$15.00" />
            <Row label="Seller A (Shenzhen Courier)" value="+$4.00" red />
            <Row label="Seller B (Yiwu Courier)" value="+$4.50" red />
            <Row label="Seller C (Guangzhou Courier)" value="+$4.00" red />
            <Row label="Platform Service Fee" value="+$1.30" />
            <Row label="Final Checkout Total" value="$28.80" strong red />
          </div>
          <p className="mb-3 text-[11px] italic text-slate-500">
            “The total was supposed to be $15, but jumped to $28.80 with 3
            shipping fees. I felt bait-and-switched.”
          </p>
          <Button
            onClick={onPurge}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-rose-600 py-2.5 text-xs font-black text-white shadow-md hover:bg-rose-700"
          >
            <Trash2 size={14} /> Spite Purge (Delete All)
          </Button>
        </div>
      </Overlay>
    );
  return (
    <Overlay onClose={onClose}>
      <div className="w-full max-w-97.5 rounded-t-[28px] bg-white p-5 shadow-2xl">
        <ModalHeader
          icon={<Zap size={17} />}
          title="3-Sec Head-to-Head Showdown"
          subtitle="Comparing top 2 candidate earbuds from your cart"
          onClose={onClose}
        />
        <div className="my-3 grid grid-cols-2 gap-2.5">
          <CompareCard
            winner
            name="Baseus Bowie 30 ANC"
            price="19.90"
            emoji="🎧"
            details={[
              "Mic Score: 9.4/10 (Clear)",
              "Battery: 30 Hours",
              "Return Rate: < 0.4%",
              "Ships in 4 hrs",
            ]}
            onClick={() => onChooseWinner("Baseus Bowie 30 ANC", 19.9)}
          />
          <CompareCard
            name="SoundCore A20 Bass"
            price="26.00"
            emoji="🎙️"
            details={[
              "Mic Score: 7.8/10",
              "Battery: 24 Hours",
              "Return Rate: 1.8%",
              "Overseas 7 days",
            ]}
            onClick={() => onChooseWinner("SoundCore A20 Bass", 26)}
          />
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 p-2.5 text-[11px] text-orange-950">
          <Sparkles size={14} className="shrink-0 text-shopee" />
          <span>
            <b>Auto-Bench Protection:</b> The other 3 pairs move to Saved for
            Later.
          </span>
        </div>
      </div>
    </Overlay>
  );
}

function ModalHeader({ icon, title, subtitle, onClose }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-shopee text-white">
          {icon}
        </span>
        <div>
          <h3 className="text-sm font-black text-slate-900">{title}</h3>
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        </div>
      </div>
      <Button
        onClick={onClose}
        className="p-2 text-slate-400 hover:text-slate-700"
      >
        <X size={17} />
      </Button>
    </div>
  );
}
function CompareCard({ winner, name, price, emoji, details, onClick }) {
  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl p-3 ${winner ? "border-2 border-shopee bg-orange-50" : "border border-slate-200 bg-white"}`}
    >
      {winner && (
        <span className="absolute -top-2.5 left-3 rounded-full bg-shopee px-2 py-0.5 text-[9px] font-black uppercase text-white">
          Top Pick (98% Match)
        </span>
      )}
      <div>
        <div className="mb-2 flex h-16 items-center justify-center rounded-xl bg-white text-3xl">
          {emoji}
        </div>
        <h4 className="text-xs font-bold leading-snug text-slate-900">
          {name}
        </h4>
        <span className="mt-1 block text-sm font-extrabold text-shopee">
          ${price}
        </span>
        <div className="mt-2.5 space-y-1.5 text-[10px] text-slate-600">
          {details.map((detail) => (
            <div key={detail} className="border-b border-slate-100 py-0.5">
              {detail}
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={onClick}
        className={`mt-3 w-full rounded-xl py-2 text-xs font-extrabold ${winner ? "bg-shopee text-white hover:bg-shopee-dark" : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}
      >
        {winner ? "Pick Winner" : "Pick SoundCore"}
      </Button>
    </div>
  );
}
function DeckCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
      <h4 className="mb-1 text-sm font-extrabold text-slate-900">{title}</h4>
      <p className="text-slate-600">{children}</p>
    </div>
  );
}
function Row({ label, value, red, strong }) {
  return (
    <div
      className={`flex justify-between ${strong ? "border-t-2 border-dashed border-rose-300 pt-2 text-sm font-black" : ""} ${red ? "text-rose-600" : "text-slate-700"}`}
    >
      <span>{label}</span>
      <span className={strong ? "text-lg font-black" : "font-bold"}>
        {value}
      </span>
    </div>
  );
}
