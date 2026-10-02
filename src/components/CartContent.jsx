import {
  Box,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  LockKeyhole,
  Sparkles,
  Trash2,
  Minus,
  Plus,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { merchants, rankRecommendations, scenario1Items } from "../data";
import { Button } from "./ui";

const FALLBACK_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=480&q=85";

function ProductImage({ src, alt = "", className }) {
  return (
    <img
      src={src || FALLBACK_PRODUCT_IMAGE}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.src !== FALLBACK_PRODUCT_IMAGE) {
          event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
        }
      }}
    />
  );
}

export function ScenarioOne({ state, onOpenModal, onSetState, onUpdateQuantity, onAddToCart, onRemoveFromCart, catalog }) {
  const [topPick] = rankRecommendations();
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
        <StoreCard items={state.carts?.[1] ?? []} onUpdateQuantity={onUpdateQuantity} onRemoveFromCart={onRemoveFromCart} />
      </div>
    );
  if (state.winnerPicked)
    return <div className="space-y-2.5"><WinnerState state={state} onSetState={onSetState} /><StoreCard items={state.carts?.[1] ?? []} onUpdateQuantity={onUpdateQuantity} onRemoveFromCart={onRemoveFromCart} /><CartEditor catalog={catalog} cart={state.carts?.[1] ?? []} onAddToCart={onAddToCart} /></div>;
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
              {topPick.match}% Match
            </span>
          </div>
          <p className="mt-1 leading-relaxed">
            We found the best match from your 4 earbuds using microphone clarity,
            battery, reliability, delivery speed, and value.
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
        <div className="mt-2 rounded-xl bg-slate-50 p-2 text-[10px] text-slate-500">
          <span className="font-bold text-slate-700">Why this pick?</span>{" "}
          {topPick.micClarity}/10 mic clarity · {topPick.battery}h battery · {topPick.delivery}/10 delivery confidence
        </div>
      </div>
      <StoreCard items={state.carts?.[1] ?? []} onUpdateQuantity={onUpdateQuantity} onRemoveFromCart={onRemoveFromCart} />
      <CartEditor catalog={catalog} cart={state.carts?.[1] ?? []} onAddToCart={onAddToCart} />
    </div>
  );
}

export function ScenarioTwo({ state, onConsolidate, onSetState, onUpdateQuantity, onAddToCart, onRemoveFromCart, catalog }) {
  const cart = state.carts?.[2] ?? [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cart.reduce((sum, item) => sum + item.fee, 0);
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
        <MerchantCards items={state.carts?.[2] ?? []} onUpdateQuantity={onUpdateQuantity} onRemoveFromCart={onRemoveFromCart} />
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
          {(state.carts?.[2] ?? []).map(({ id, emoji, image, name, price, qty }) => (
            <div
              key={id}
              className="flex items-center justify-between border-b border-slate-100 py-2 text-xs last:border-0"
            >
              <span className="flex items-center gap-2 font-medium text-slate-800">
                <ProductImage src={image} className="h-8 w-8 rounded-lg object-cover" />
                {name.split(" (")[0]}
              </span>
              <span className="flex items-center gap-2 font-black text-shopee">${(price * qty).toFixed(2)} <QuantityControls item={{ id, qty }} onUpdateQuantity={onUpdateQuantity} onRemoveFromCart={onRemoveFromCart} /></span>
            </div>
          ))}
          <div className="space-y-1 border-t border-slate-100 pt-2 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal:</span>
              <b>${(state.carts?.[2] ?? []).reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</b>
            </div>
            <div className="flex justify-between font-bold text-emerald-600">
              <span>Unified Box Shipping:</span>
              <span>FREE (Saved ${shipping.toFixed(2)})</span>
            </div>
          </div>
        </div>
        <CartEditor catalog={catalog} cart={state.carts?.[2] ?? []} onAddToCart={onAddToCart} />
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
            <div className="mt-2 flex items-center justify-between rounded-lg bg-white/70 px-2 py-1.5 text-[10px] font-semibold text-slate-600">
              <span>Items ${subtotal.toFixed(2)}</span><span className="text-rose-500">Shipping +${shipping.toFixed(2)}</span><b className="text-slate-900">True cost ${(subtotal + shipping).toFixed(2)}</b>
            </div>
            <Button
              onClick={onConsolidate}
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2 text-xs font-extrabold text-white shadow-md hover:bg-emerald-700"
            >
              <Sparkles size={13} /> 1-Tap Consolidate (Save ${shipping.toFixed(2)})
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-3 text-xs opacity-75">
        <span className="text-[11px] font-bold text-slate-500">
          Unconsolidated Overseas Fees:
        </span>
      {(state.carts?.[2] ?? []).map(({ emoji, name, fee, price, qty, id }) => (
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
      <CartEditor catalog={catalog} cart={state.carts?.[2] ?? []} onAddToCart={onAddToCart} />
    </div>
  );
}

function StoreCard({ items, onUpdateQuantity, onRemoveFromCart }) {
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
      {items.map(({ id, emoji, image, name, meta, price, qty }) => (
        <div
          key={id}
          className="flex items-start gap-2.5 border-b border-slate-50 py-1 last:border-0"
        >
          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border border-shopee bg-shopee text-[9px] text-white">
            ✓
          </span>
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-2xl">
            <ProductImage src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-xs font-semibold text-slate-900">
              {name}
            </h4>
            <div className="my-0.5 text-[10px] text-slate-400">{meta}</div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs font-black text-shopee">${(price * qty).toFixed(2)}</span>
              <QuantityControls item={{ id, qty }} onUpdateQuantity={onUpdateQuantity} onRemoveFromCart={onRemoveFromCart} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MerchantCards({ items, onUpdateQuantity, onRemoveFromCart }) {
  return (
    <div className="space-y-2.5">
      {items.map(({ id, emoji, image, name, seller, price, fee, qty }) => (
        <div
          key={id}
          className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
        >
          <div className="flex justify-between border-b border-slate-100 pb-1.5 text-xs font-semibold">
            <span className="text-slate-800">{seller}</span>
            <span className="text-[10px] text-slate-400">Overseas +${fee}</span>
          </div>
          <div className="flex items-center gap-2.5 pt-2">
            <ProductImage src={image} alt={name} className="h-10 w-10 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <h5 className="truncate text-xs font-semibold text-slate-900">
                {name}
              </h5>
              <span className="mt-0.5 block text-xs font-black text-shopee">
                ${(price * qty).toFixed(2)} · {qty} item{qty === 1 ? '' : 's'}
              </span>
            </div>
          </div>
          <QuantityControls item={{ id, qty }} onUpdateQuantity={onUpdateQuantity} onRemoveFromCart={onRemoveFromCart} />
        </div>
      ))}
    </div>
  );
}

function QuantityControls({ item, onUpdateQuantity, onRemoveFromCart }) {
  return (
    <div className="flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white text-[11px]">
      <button aria-label="Decrease quantity" onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-1 text-slate-500 hover:bg-slate-50"><Minus size={11} /></button>
      <span className="min-w-5 text-center font-bold text-slate-700">{item.qty}</span>
      <button aria-label="Increase quantity" onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-1 text-shopee hover:bg-orange-50"><Plus size={11} /></button>
      <button aria-label="Remove item" onClick={() => onRemoveFromCart(item.id)} className="border-l border-slate-200 px-2 py-1 text-rose-500 hover:bg-rose-50"><Trash2 size={11} /></button>
    </div>
  );
}

function CartEditor({ catalog, cart, onAddToCart }) {
  const available = catalog.filter((candidate) => !cart.some((item) => item.id === candidate.id));
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-600">Add another item</span>
        <Plus size={14} className="text-shopee" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {available.map((item) => (
          <button key={item.id} onClick={() => onAddToCart(item)} className="min-w-28 rounded-xl border border-slate-200 bg-slate-50 p-2 text-left hover:border-orange-300 hover:bg-orange-50">
            <ProductImage src={item.image} alt={item.name} className="h-8 w-8 rounded-lg object-cover" />
            <span className="mt-1 block truncate text-[10px] font-bold text-slate-800">{item.name.split(' ').slice(0, 2).join(' ')}</span>
            <span className="text-[10px] font-black text-shopee">${item.price.toFixed(2)}</span>
          </button>
        ))}
        {!available.length && <span className="text-[10px] text-slate-400">All catalog items are in your cart.</span>}
      </div>
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
          <ProductImage src={state.winnerImage} className="h-12 w-12 rounded-xl object-cover" />
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
