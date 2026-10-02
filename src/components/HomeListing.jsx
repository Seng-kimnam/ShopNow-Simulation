import { ArrowDown, ArrowUp, Heart, ShoppingBag, Sparkles, Star } from "lucide-react";
import { Button } from "./ui";

const FALLBACK_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=480&q=85";

const productSignals = [
  { match: 98, tag: "Best overall", note: "Strong mic + fast delivery" },
  { match: 91, tag: "Best value", note: "Low price, high volume" },
  { match: 94, tag: "Best for calls", note: "Clear voice pickup" },
  { match: 89, tag: "Balanced pick", note: "Reliable everyday ANC" },
];

export function HomeListing({ products, cart, onAddToCart, onViewCart, compact = false }) {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <section className={compact ? "space-y-2.5" : "mx-auto mb-8 w-full max-w-6xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-shopee">
            <Sparkles size={13} /> Smart picks for you
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Find your next favorite</h2>
          <p className="mt-1 text-xs text-slate-500">Compare the things that matter before a product ever reaches your cart.</p>
        </div>
        <Button onClick={onViewCart} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:border-orange-200 hover:bg-orange-50 hover:text-shopee">
          <ShoppingBag size={14} /> Smart cart <span className="rounded-full bg-slate-900 px-1.5 py-0.5 text-[10px] text-white">{cartCount}</span>
        </Button>
      </div>
      <div className={compact ? "grid grid-cols-2 gap-2" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-4"}>
        {products.map((product, index) => {
          const quantity = cart.find((item) => item.id === product.id)?.qty ?? 0;
          const signal = productSignals[index % productSignals.length];
          return (
            <article key={product.id} className={`group relative flex flex-col rounded-2xl border p-2.5 transition hover:-translate-y-0.5 hover:shadow-md ${index === 0 ? "border-orange-300 bg-orange-50/40" : "border-slate-200 bg-white"}`}>
              <button aria-label="Save product" className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-slate-400 shadow-sm hover:text-rose-500"><Heart size={14} /></button>
              <div className="relative mb-2 flex h-24 items-center justify-center overflow-hidden rounded-xl bg-slate-100"><img src={product.image || FALLBACK_PRODUCT_IMAGE} alt={product.name} onError={(event) => { event.currentTarget.src = FALLBACK_PRODUCT_IMAGE; }} className="h-full w-full object-cover" /><span className="absolute bottom-1 left-1 rounded bg-white/85 px-1 text-xs">{product.emoji}</span></div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700">{signal.match}% match</span>
                <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500"><Star size={11} fill="currentColor" /> {index === 0 ? "4.3" : index === 1 ? "4.2" : index === 2 ? "4.7" : "4.5"}</span>
              </div>
              <h3 className="min-h-9 text-xs font-extrabold leading-snug text-slate-900">{product.name}</h3>
              <p className="mt-1 text-[10px] text-slate-500">{signal.tag} · {signal.note}</p>
              <div className="mt-auto flex items-end justify-between gap-2 pt-4">
                <div><span className="block text-lg font-black text-shopee">${product.price.toFixed(2)}</span><span className="text-[9px] font-semibold text-emerald-600">Delivery included</span></div>
                <Button onClick={() => onAddToCart(product)} className="rounded-xl bg-shopee px-2.5 py-2 text-[10px] font-extrabold text-white shadow-sm hover:bg-shopee-dark">{quantity ? <span className="flex items-center gap-1"><ArrowUp size={12} /> Add ({quantity})</span> : "Add to cart"}</Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
