import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft,
  BatteryFull,
  BookOpen,
  Box,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  GraduationCap,
  Lightbulb,
  LockKeyhole,
  Microchip,
  Signal,
  Sparkles,
  Trash2,
  TriangleAlert,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import './index.css'

const initialState = {
  mode: 'optimized',
  scenario: 1,
  winnerPicked: false,
  winnerName: 'Baseus Bowie 30 ANC',
  winnerPrice: 19.9,
  purged: false,
  consolidated: false,
}

const scenario1Items = [
  ['🎧', 'Baseus Bowie 30 ANC Wireless', 'Matte Black • 4.3 ★ (2.1k sold)', '22.90'],
  ['🎵', 'Lenovo ThinkPlus LP40 Pro', 'Pure White • 4.2 ★ (8.9k sold)', '18.50'],
  ['🎙️', 'SoundCore A20 Bass', 'Midnight Blue • 4.7 ★ (4.3k sold)', '26.00'],
  ['🎼', 'QCY T13 ANC Earbuds', 'Cloud White • 4.5 ★ (1.7k sold)', '27.20'],
]

const merchants = [
  ['🔌', 'Braided Type-C Fast Cable (1m)', 'Shenzhen Digital Direct', '3.00', '4.00'],
  ['📐', 'Minimalist Felt Desk Mat (L)', 'Yiwu Stationery Co.', '6.50', '4.50'],
  ['☕', 'Nordic Matte Ceramic Mug', 'Guangzhou Ceramic Goods', '5.50', '4.00'],
]

function Button({ children, className = '', ...props }) {
  return <button className={`transition active:scale-[.98] ${className}`} {...props}>{children}</button>
}

function App() {
  const [state, setState] = useState(initialState)
  const [modal, setModal] = useState(null)
  const [toasts, setToasts] = useState([])

  const toast = (message, tone = 'orange') => {
    const id = Date.now()
    setToasts((current) => [...current, { id, message, tone }])
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 2600)
  }

  const setMode = (mode) => {
    setState((current) => ({ ...current, mode }))
    toast(mode === 'legacy' ? 'Legacy flow enabled' : 'ShopNow 2.0 optimizer enabled')
  }

  const setScenario = (scenario) => {
    setState((current) => ({ ...current, scenario }))
    toast(`Scenario ${scenario} loaded`)
  }

  const reset = () => {
    setState(initialState)
    setModal(null)
    toast('Simulator reset to initial state')
  }

  const chooseWinner = (name, price) => {
    setState((current) => ({ ...current, winnerPicked: true, winnerName: name, winnerPrice: price }))
    setModal(null)
    toast(`Winner picked: ${name}`,'green')
  }

  const consolidate = () => {
    setState((current) => ({ ...current, consolidated: true }))
    toast('Consolidated into Central Hub. Free shipping.', 'green')
  }

  const purge = () => {
    setState((current) => ({ ...current, purged: true }))
    setModal(null)
    toast('Cart deleted due to surprise delivery fees', 'red')
  }

  const checkout = () => {
    if (state.scenario === 2 && state.mode === 'legacy') setModal('shock')
    else toast(`Instant checkout success. Total: $${phoneSummary(state).total}`, 'green')
  }

  const summary = phoneSummary(state)
  const metrics = telemetry(state)

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-3 font-sans text-slate-800 antialiased selection:bg-orange-500 selection:text-white sm:px-6">
      <header className="mx-auto mb-6 flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ee4d2d] text-white shadow-md shadow-orange-200"><Box size={19} /></div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-slate-900">ShopNow <span className="text-[#ee4d2d]">Simulator</span></h1>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ee4d2d]">Light Mode SEA</span>
            </div>
            <p className="text-xs font-medium text-slate-500">Authentic Marketplace UI • Decision Head-to-Head • Split Fee Optimizer</p>
          </div>
        </div>

        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs">
          <Button onClick={() => setMode('legacy')} className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-bold ${state.mode === 'legacy' ? 'border border-slate-200 bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Legacy (Broken Flow)
          </Button>
          <Button onClick={() => setMode('optimized')} className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-bold ${state.mode === 'optimized' ? 'border border-slate-200 bg-white text-[#ee4d2d] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> ShopNow 2.0 (Optimized)
          </Button>
        </div>

        <div className="no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto text-xs">
          <Button onClick={() => setScenario(1)} className={`whitespace-nowrap rounded-xl px-3 py-1.5 font-bold ${state.scenario === 1 ? 'bg-slate-900 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>🎧 Scenario 1: Earbud Choice Paralysis</Button>
          <Button onClick={() => setScenario(2)} className={`whitespace-nowrap rounded-xl px-3 py-1.5 font-bold ${state.scenario === 2 ? 'bg-slate-900 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>📦 Scenario 2: Split Shipping Shock</Button>
          <Button onClick={() => setModal('insights')} className="whitespace-nowrap rounded-xl border border-orange-200 bg-orange-50 px-3 py-1.5 font-bold text-[#ee4d2d] hover:bg-orange-100"><BookOpen size={13} className="mr-1 inline" /> Behavioral Deck</Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col items-start justify-center gap-8 pb-12 lg:flex-row">
        <Phone state={state} summary={summary} onReset={reset} onCheckout={checkout} onOpenModal={setModal} onConsolidate={consolidate} onSetState={setState} />
        <Telemetry state={state} metrics={metrics} />
      </main>

      {modal && <Modal type={modal} state={state} onClose={() => setModal(null)} onChooseWinner={chooseWinner} onPurge={purge} />}
      <div className="fixed bottom-5 right-5 z-[70] flex max-w-[calc(100vw-2.5rem)] flex-col gap-2">
        {toasts.map((item) => <div key={item.id} className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs text-white shadow-xl ${item.tone === 'red' ? 'bg-rose-700/95' : item.tone === 'green' ? 'bg-emerald-700/95' : 'bg-slate-900/95'}`}><CheckCircle2 size={14} /><span>{item.message}</span></div>)}
      </div>
    </div>
  )
}

function Phone({ state, summary, onReset, onCheckout, onOpenModal, onConsolidate, onSetState }) {
  const optimized = state.mode === 'optimized'
  return (
    <div className="relative mx-auto flex shrink-0 flex-col items-center lg:mx-0">
      <div className="mb-2 flex w-full max-w-[390px] items-center justify-between px-2 text-xs font-semibold">
        <span className={`flex items-center gap-1.5 font-bold ${optimized ? 'text-[#ee4d2d]' : 'text-rose-500'}`}>
          {optimized ? <CircleCheck size={13} /> : <TriangleAlert size={13} />} {optimized ? 'ShopNow 2.0 • Decision Engine Active' : 'Legacy Mode • High Drop-Off'}
        </span>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] ${optimized ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-rose-200 bg-rose-50 text-rose-600'}`}>{optimized ? 'Optimal Conversion' : 'Severe Paralysis'}</span>
      </div>

      <div className="phone-frame relative flex h-[820px] w-[390px] select-none flex-col overflow-hidden rounded-[46px] bg-white">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-7 pt-2 text-xs font-bold text-slate-900">
          <span>9:41</span><div className="flex h-5 w-24 items-center justify-end gap-1 rounded-full bg-black px-2"><span className="h-2 w-2 rounded-full bg-slate-800" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ee4d2d]" /></div><div className="flex items-center gap-1.5 text-slate-800"><Signal size={11} /><Wifi size={11} /><BatteryFull size={14} /></div>
        </div>
        <div className="z-20 flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-2.5">
          <div className="flex items-center gap-3"><Button className="text-slate-700 hover:text-slate-900"><ArrowLeft size={16} /></Button><div className="flex items-baseline gap-1.5"><h2 className="text-base font-bold text-slate-900">Shopping Cart</h2><span className="text-xs font-medium text-slate-400">({summary.count})</span></div></div>
          <div className="flex items-center gap-3"><span className="cursor-pointer text-xs font-medium text-slate-600">Edit</span><Button onClick={onReset} className="text-xs font-bold text-[#ee4d2d] hover:text-orange-700">Reset</Button></div>
        </div>
        <div className="no-scrollbar flex-1 space-y-2.5 overflow-y-auto bg-[#f5f5f7] p-2.5">
          {state.scenario === 1 ? <ScenarioOne state={state} onOpenModal={onOpenModal} onSetState={onSetState} /> : <ScenarioTwo state={state} onConsolidate={onConsolidate} onSetState={onSetState} />}
        </div>
        <div className="z-30 flex shrink-0 items-center justify-between border-t border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,.06)]">
          <Button className="flex items-center gap-2 text-xs font-semibold text-slate-700" onClick={() => {}}><span className="flex h-4 w-4 items-center justify-center rounded-md border border-[#ee4d2d] bg-[#ee4d2d] text-white"><Check size={11} /></span>All</Button>
          <div className="flex items-center gap-3"><div className="text-right"><div className="flex items-baseline justify-end"><span className="mr-1 text-[11px] font-medium text-slate-600">Total:</span><Price value={summary.total} /></div><span className="mt-0.5 block text-[9px] font-semibold leading-none text-[#ee4d2d]">{summary.savings}</span></div><Button onClick={onCheckout} className="flex items-center gap-1 rounded-full bg-[#ee4d2d] px-6 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-orange-700">Checkout <span className="text-[11px] font-medium">({summary.count})</span></Button></div>
        </div>
        <div className="flex h-3 shrink-0 items-center justify-center bg-white"><div className="h-1 w-32 rounded-full bg-slate-300" /></div>
      </div>
    </div>
  )
}

function ScenarioOne({ state, onOpenModal, onSetState }) {
  if (state.mode === 'legacy') return <div className="space-y-2.5"><div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800"><TriangleAlert size={14} className="mt-0.5 shrink-0 text-rose-500" /><div><strong className="block text-slate-900">Choice Overload: 4 earbuds in cart ($94.60)</strong><span>Undifferentiated specs trigger 84% abandonment.</span></div></div><StoreCard items={scenario1Items} /></div>
  if (state.winnerPicked) return <WinnerState state={state} onSetState={onSetState} />
  return <div className="space-y-2.5"><div className="flex items-start gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-900"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"><Sparkles size={15} /></div><div className="flex-1"><div className="flex items-center justify-between gap-2"><h4 className="text-xs font-extrabold text-slate-900">3-Sec Head-to-Head Showdown</h4><span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">98% Match</span></div><p className="mt-1 leading-relaxed">We found the best match from your 4 earbuds. Compare real microphone clarity, battery, and return data.</p><Button onClick={() => onOpenModal('showdown')} className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#ee4d2d] py-2 text-xs font-extrabold text-white shadow-md hover:bg-orange-700"><Zap size={13} /> Compare top 2 choices</Button></div></div><div className="rounded-2xl border border-slate-100 bg-white p-3 text-xs opacity-75"><span className="text-[11px] font-bold text-slate-500">Other options moved to comparison bench</span>{scenario1Items.slice(1).map((item) => <div key={item[1]} className="flex items-center justify-between border-b border-slate-50 py-2 last:border-0"><span>{item[0]} {item[1].split(' ')[0]}...</span><span className="text-slate-500">${item[3]}</span></div>)}</div></div>
}

function ScenarioTwo({ state, onConsolidate, onSetState }) {
  if (state.mode === 'legacy') return state.purged ? <div className="space-y-2.5"><div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center"><Trash2 className="mx-auto mb-2 text-rose-500" size={26} /><h4 className="text-sm font-black text-rose-800">Cart Purged</h4><p className="mt-1 text-xs text-rose-700">The price shock caused a spite purge.</p><Button onClick={() => onSetState((current) => ({ ...current, purged: false }))} className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm">Restore cart</Button></div></div> : <div className="space-y-2.5"><div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800"><div className="flex items-center gap-2 font-black text-slate-900"><CircleAlert size={15} className="text-rose-600" /> Split shipping fees hidden until checkout</div><p className="mt-1.5 leading-relaxed">Three overseas sellers turn this $15.00 cart into a $28.80 surprise at step 4.</p></div><MerchantCards /></div>
  if (state.consolidated) return <div className="space-y-2.5"><div className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 p-2.5 text-xs text-emerald-900"><span className="flex items-center gap-1.5 font-bold"><CircleCheck size={14} className="text-emerald-600" /> Consolidated into 1 Local Hub Box</span><Button onClick={() => onSetState((current) => ({ ...current, consolidated: false }))} className="text-[10px] text-slate-500 hover:underline">Revert</Button></div><div className="space-y-2.5 rounded-2xl border-2 border-emerald-400 bg-white p-3"><div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs"><span className="font-bold text-slate-900">ShopNow FastFulfill Central Hub</span><span className="text-[10px] font-bold text-emerald-600">FREE Delivery</span></div>{merchants.map(([emoji, name, , price]) => <div key={name} className="flex items-center justify-between border-b border-slate-100 py-2 text-xs last:border-0"><span className="flex items-center gap-2 font-medium text-slate-800"><span className="text-xl">{emoji}</span>{name.split(' (')[0]}</span><span className="font-black text-[#ee4d2d]">${price}</span></div>)}<div className="space-y-1 border-t border-slate-100 pt-2 text-[11px]"><div className="flex justify-between text-slate-600"><span>Items Subtotal:</span><b>$15.00</b></div><div className="flex justify-between font-bold text-emerald-600"><span>Unified Box Shipping:</span><span>FREE (Saved $12.50)</span></div></div></div></div>
  return <div className="space-y-2.5"><div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-3"><div className="flex items-start gap-2.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"><Box size={15} /></div><div className="flex-1"><div className="flex items-center justify-between gap-2"><h4 className="text-xs font-extrabold text-slate-900">1-Tap Basket Optimizer</h4><span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">Free Combined Box</span></div><p className="mt-1 text-[11px] leading-relaxed text-slate-600">All 3 items are available from the <b>ShopNow Regional Central Hub</b>. Consolidate into 1 shipment for $0 combined delivery.</p><Button onClick={onConsolidate} className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2 text-xs font-extrabold text-white shadow-md hover:bg-emerald-700"><Sparkles size={13} /> 1-Tap Consolidate (Save $12.50)</Button></div></div></div><div className="rounded-2xl border border-slate-100 bg-white p-3 text-xs opacity-75"><span className="text-[11px] font-bold text-slate-500">Unconsolidated Overseas Fees:</span>{merchants.map(([emoji, name, seller, , fee]) => <div key={name} className="flex justify-between border-b border-slate-50 py-1 last:border-0"><span>{emoji} {name.split(' (')[0]}</span><span className="font-semibold text-rose-500">+${fee}</span></div>)}</div></div>
}

function StoreCard({ items }) { return <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs"><span className="flex items-center gap-1.5"><span className="rounded bg-[#d0011b] px-1.5 py-0.5 text-[9px] font-black text-white">Mall</span><b>SoundHub Official Store</b><ChevronRight size={11} className="text-slate-400" /></span><span className="font-semibold text-[#ee4d2d]">Vouchers</span></div>{items.map(([emoji, name, meta, price]) => <div key={name} className="flex items-start gap-2.5 border-b border-slate-50 py-1 last:border-0"><span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border border-[#ee4d2d] bg-[#ee4d2d] text-[9px] text-white">✓</span><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl">{emoji}</div><div className="min-w-0 flex-1"><h4 className="truncate text-xs font-semibold text-slate-900">{name}</h4><div className="my-0.5 text-[10px] text-slate-400">{meta}</div><div className="mt-1 flex items-center justify-between"><span className="text-xs font-black text-[#ee4d2d]">${price}</span><span className="rounded border border-slate-200 px-1.5 py-0.5 text-[11px]">− &nbsp;1&nbsp; +</span></div></div></div>)}</div> }

function MerchantCards() { return <div className="space-y-2.5">{merchants.map(([emoji, name, seller, price, fee]) => <div key={seller} className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"><div className="flex justify-between border-b border-slate-100 pb-1.5 text-xs font-semibold"><span className="text-slate-800">{seller}</span><span className="text-[10px] text-slate-400">Overseas +${fee}</span></div><div className="flex items-center gap-2.5 pt-2"><span className="text-2xl">{emoji}</span><div className="min-w-0 flex-1"><h5 className="truncate text-xs font-semibold text-slate-900">{name}</h5><span className="mt-0.5 block text-xs font-black text-[#ee4d2d]">${price}</span></div></div></div>)}</div> }

function WinnerState({ state, onSetState }) { return <div className="space-y-2.5"><div className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 p-2.5 text-xs text-emerald-900"><CircleCheck size={15} className="text-emerald-600" /><span className="font-bold">Decision locked: {state.winnerName}</span></div><div className="rounded-2xl border-2 border-[#ee4d2d] bg-white p-3"><div className="flex items-center gap-2.5"><span className="text-3xl">🎧</span><div className="flex-1"><h4 className="text-xs font-bold text-slate-900">{state.winnerName}</h4><p className="text-[10px] text-slate-500">Top match • 9.4/10 mic clarity • 30 hours</p><span className="mt-1 block text-sm font-black text-[#ee4d2d]">${state.winnerPrice.toFixed(2)}</span></div><LockKeyhole size={16} className="text-emerald-600" /></div><div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500"><span>3 runners-up benched</span><Button onClick={() => onSetState((current) => ({ ...current, winnerPicked: false }))} className="font-semibold text-[#ee4d2d] hover:underline">Compare again</Button></div></div></div> }

function Price({ value }) { const [whole, cents] = value.toFixed(2).split('.'); return <span className="flex items-baseline"><span className="mr-0.5 text-[11px] font-bold text-[#ee4d2d]">$</span><span className="text-[17px] font-extrabold leading-none tracking-tight text-[#ee4d2d]">{whole}</span><span className="text-[11px] font-bold text-[#ee4d2d]">.{cents}</span></span> }

function Telemetry({ state, metrics }) { return <aside className="flex w-full max-w-xl flex-1 flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div><div className="mb-2 flex items-center justify-between gap-3"><span className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${state.scenario === 1 ? 'border-orange-200 bg-orange-50 text-[#ee4d2d]' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>{metrics.principle}</span><span className="whitespace-nowrap text-xs font-medium text-slate-400">Telemetry & Strategy Hub</span></div><h3 className="text-lg font-black leading-snug text-slate-900">{metrics.title}</h3><p className="mt-2 text-xs leading-relaxed text-slate-600">{metrics.description}</p></div><div className="space-y-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between"><h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Live Funnel Telemetry</h4><span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Real-Time Monitor</span></div>{metrics.gauges.map((gauge) => <Gauge key={gauge.label} {...gauge} />)}</div><div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs"><h4 className="flex items-center gap-1.5 font-extrabold text-slate-900"><Microchip size={14} className="text-[#ee4d2d]" /> Engine Intervention Architecture</h4>{metrics.points.map((point) => <div key={point.title} className="flex items-start gap-2"><span className={`text-sm font-bold leading-none ${state.mode === 'legacy' ? 'text-rose-500' : 'text-[#ee4d2d]'}`}>•</span><div><strong className="block font-semibold text-slate-900">{point.title}</strong><span className="text-slate-500">{point.body}</span></div></div>)}</div><div className="flex items-start gap-2.5 rounded-2xl border border-orange-200 bg-orange-50 p-3.5 text-xs text-orange-950"><Lightbulb size={15} className="mt-0.5 shrink-0 text-[#ee4d2d]" /><div className="leading-relaxed"><strong>Interactive Test Guide:</strong> Toggle modes and scenarios to observe how price consolidation and the 3-Second Showdown affect cart hesitation.</div></div></aside> }

function Gauge({ label, text, value, tone }) { return <div><div className="mb-1 flex justify-between gap-3 text-xs font-semibold"><span className="text-slate-600">{label}</span><span className={`font-black ${tone}`}>{text}</span></div><div className="h-2 w-full overflow-hidden rounded-full bg-slate-200"><div className={`h-full rounded-full transition-all duration-500 ${tone.includes('emerald') ? 'bg-emerald-500' : tone.includes('amber') ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${value}%` }} /></div></div> }

function Modal({ type, state, onClose, onChooseWinner, onPurge }) { if (type === 'insights') return <Overlay onClose={onClose}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"><ModalHeader icon={<GraduationCap size={17} />} title="ShopNow Behavioral Strategy Deck" subtitle="Why Gen Z Shoppers Abandon & How 2.0 Solves It" onClose={onClose} /><div className="mt-4 space-y-4 text-xs leading-relaxed text-slate-700"><DeckCard title="1. Barry Schwartz's Paradox of Choice (The Earbud Dilemma)">When a buyer puts 4 pairs of $20 earbuds in their cart, the cart becomes an anxious scratchpad. ShopNow 2.0's <b>3-Second Showdown</b> forces an objective comparison and benches the runners-up.</DeckCard><DeckCard title="2. Richard Thaler's Transaction Utility (The Spite Purge)">When a $15 basket jumps to $28.80 because of split overseas shipping, the deal feels ruined. The user experiences the markup as a penalty. The <b>1-Tap Central Hub Optimizer</b> keeps the bargain intact.</DeckCard><DeckCard title="3. The Anchoring Violation (Drip Pricing Breakdown)">Marketplaces present themselves as a single storefront, then reveal fragmented carrier fees at checkout. Disclosing the fees earlier protects the user's initial price anchor.</DeckCard></div><Button onClick={onClose} className="mt-5 w-full rounded-full bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800">Close Deck</Button></div></Overlay>;
  if (type === 'shock') return <Overlay onClose={onClose}><div className="w-full max-w-[390px] rounded-t-[28px] bg-white p-5 shadow-2xl"><ModalHeader icon={<TriangleAlert size={17} />} title="Split Shipping Shock at Step 4" subtitle="Your 3 impulse items are from separate overseas sellers" onClose={onClose} /><div className="my-3 space-y-1.5 rounded-2xl border border-rose-200 bg-rose-50/70 p-3 text-xs"><Row label="Items Subtotal" value="$15.00" /><Row label="Seller A (Shenzhen Courier)" value="+$4.00" red /><Row label="Seller B (Yiwu Courier)" value="+$4.50" red /><Row label="Seller C (Guangzhou Courier)" value="+$4.00" red /><Row label="Platform Service Fee" value="+$1.30" /><Row label="Final Checkout Total" value="$28.80" strong red /></div><p className="mb-3 text-[11px] italic text-slate-500">“The total was supposed to be $15, but jumped to $28.80 with 3 shipping fees. I felt bait-and-switched.”</p><Button onClick={onPurge} className="flex w-full items-center justify-center gap-1.5 rounded-full bg-rose-600 py-2.5 text-xs font-black text-white shadow-md hover:bg-rose-700"><Trash2 size={14} /> Spite Purge (Delete All)</Button></div></Overlay>;
  return <Overlay onClose={onClose}><div className="w-full max-w-[390px] rounded-t-[28px] bg-white p-5 shadow-2xl"><ModalHeader icon={<Zap size={17} />} title="3-Sec Head-to-Head Showdown" subtitle="Comparing top 2 candidate earbuds from your cart" onClose={onClose} /><div className="my-3 grid grid-cols-2 gap-2.5"><CompareCard winner name="Baseus Bowie 30 ANC" price="19.90" emoji="🎧" details={['Mic Score: 9.4/10 (Clear)', 'Battery: 30 Hours', 'Return Rate: < 0.4%', 'Ships in 4 hrs']} onClick={() => onChooseWinner('Baseus Bowie 30 ANC', 19.9)} /><CompareCard name="SoundCore A20 Bass" price="26.00" emoji="🎙️" details={['Mic Score: 7.8/10', 'Battery: 24 Hours', 'Return Rate: 1.8%', 'Overseas 7 days']} onClick={() => onChooseWinner('SoundCore A20 Bass', 26)} /></div><div className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 p-2.5 text-[11px] text-orange-950"><Sparkles size={14} className="shrink-0 text-[#ee4d2d]" /><span><b>Auto-Bench Protection:</b> The other 3 pairs move to Saved for Later.</span></div></div></Overlay> }

function Overlay({ children, onClose }) { return <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>{children}</div> }
function ModalHeader({ icon, title, subtitle, onClose }) { return <div className="flex items-center justify-between border-b border-slate-100 pb-3"><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ee4d2d] text-white">{icon}</span><div><h3 className="text-sm font-black text-slate-900">{title}</h3><p className="text-[11px] text-slate-500">{subtitle}</p></div></div><Button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700"><X size={17} /></Button></div> }
function CompareCard({ winner, name, price, emoji, details, onClick }) { return <div className={`relative flex flex-col justify-between rounded-2xl p-3 ${winner ? 'border-2 border-[#ee4d2d] bg-orange-50' : 'border border-slate-200 bg-white'}`}>{winner && <span className="absolute -top-2.5 left-3 rounded-full bg-[#ee4d2d] px-2 py-0.5 text-[9px] font-black uppercase text-white">Top Pick (98% Match)</span>}<div><div className="mb-2 flex h-16 items-center justify-center rounded-xl bg-white text-3xl">{emoji}</div><h4 className="text-xs font-bold leading-snug text-slate-900">{name}</h4><span className="mt-1 block text-sm font-extrabold text-[#ee4d2d]">${price}</span><div className="mt-2.5 space-y-1.5 text-[10px] text-slate-600">{details.map((detail) => <div key={detail} className="border-b border-slate-100 py-0.5">{detail}</div>)}</div></div><Button onClick={onClick} className={`mt-3 w-full rounded-xl py-2 text-xs font-extrabold ${winner ? 'bg-[#ee4d2d] text-white hover:bg-orange-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>{winner ? 'Pick Winner' : 'Pick SoundCore'}</Button></div> }
function DeckCard({ title, children }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5"><h4 className="mb-1 text-sm font-extrabold text-slate-900">{title}</h4><p className="text-slate-600">{children}</p></div> }
function Row({ label, value, red, strong }) { return <div className={`flex justify-between ${strong ? 'border-t-2 border-dashed border-rose-300 pt-2 text-sm font-black' : ''} ${red ? 'text-rose-600' : 'text-slate-700'}`}><span>{label}</span><span className={strong ? 'text-lg font-black' : 'font-bold'}>{value}</span></div> }

function phoneSummary(state) { if (state.scenario === 1) return state.mode === 'legacy' ? { total: 94.6, count: 4, savings: 'Standard overseas shipping: $4.50' } : state.winnerPicked ? { total: state.winnerPrice, count: 1, savings: 'Showdown Promo: -$3.00 applied' } : { total: 19.9, count: 1, savings: 'Decision Engine preview: $19.90' }; return state.mode === 'legacy' ? { total: state.purged ? 0 : 15, count: state.purged ? 0 : 3, savings: state.purged ? 'Cart is empty' : 'Shipping revealed at checkout' } : { total: 15, count: 3, savings: state.consolidated ? 'Single Hub: FREE SHIPPING ($0.00)' : 'Split shipping detected: +$12.50' } }

function telemetry(state) { if (state.scenario === 1) return state.mode === 'legacy' ? { principle: 'Barry Schwartz Paradox of Choice', title: 'Scenario 1: 4 Earbuds in Cart ($94.60 Bloat & Paralysis)', description: 'Gen Z shoppers misuse the cart as a comparison scratchpad. Holding 4 substitute earbuds triggers high anticipated regret and analysis paralysis.', gauges: [{ label: 'Cognitive Friction Index', text: '89% (Severe Overload)', value: 89, tone: 'text-rose-600' }, { label: 'Predicted Cart Abandonment Rate', text: '84%', value: 84, tone: 'text-rose-600' }, { label: 'Landed Price Predictability', text: '38% (Vague Spec Differences)', value: 38, tone: 'text-amber-600' }], points: [{ title: 'Scratchpad Cart Syndrome', body: 'Cart artificially surges to $94.60 across 4 redundant pairs.' }, { title: 'Anticipated Regret', body: 'Without objective comparison, fear of poor call quality blocks checkout.' }] } : { principle: 'Barry Schwartz Paradox of Choice', title: 'Scenario 1: 4 Earbuds in Cart ($94.60 Bloat & Paralysis)', description: 'The decision engine turns a comparison scratchpad into a fast, objective recommendation.', gauges: [{ label: 'Cognitive Friction Index', text: '12% (Friction Neutralized)', value: 12, tone: 'text-emerald-600' }, { label: 'Predicted Cart Abandonment Rate', text: '9%', value: 9, tone: 'text-emerald-600' }, { label: 'Landed Price Predictability', text: '100% (Direct Heuristics)', value: 100, tone: 'text-emerald-600' }], points: [{ title: '3-Sec Head-to-Head Showdown', body: 'Compares mic clarity, battery, and return rate rather than generic ratings.' }, { title: 'Auto-Bench Runners Up', body: 'Unselected options move to Saved for Later, dropping active cart anxiety.' }] }; return state.mode === 'legacy' ? { principle: 'Richard Thaler Transaction Utility', title: 'Scenario 2: Split Shipping Shock ($15 Jumped to $28.80)', description: 'Users anchor at a $15 budget. Revealing 3 overseas carrier fees at checkout causes a spite purge.', gauges: [{ label: 'Cognitive Friction Index', text: '94% (Betrayal Friction)', value: 94, tone: 'text-rose-600' }, { label: 'Predicted Cart Abandonment Rate', text: '89% (Spite Purge)', value: 89, tone: 'text-rose-600' }, { label: 'Landed Price Predictability', text: '15% (Severe Drip Pricing)', value: 15, tone: 'text-rose-600' }], points: [{ title: 'Destruction of Deal Value', body: 'Delivery fees almost double the cost of 3 cheap items.' }, { title: 'Spite Cart Purge', body: 'Users delete the entire cart as an emotional reset.' }] } : { principle: 'Richard Thaler Transaction Utility', title: 'Scenario 2: Split Shipping Shock ($15 Jumped to $28.80)', description: 'The optimizer consolidates fragmented sellers before checkout so the $15 price anchor survives.', gauges: [{ label: 'Cognitive Friction Index', text: '8% (Seamless Flow)', value: 8, tone: 'text-emerald-600' }, { label: 'Predicted Cart Abandonment Rate', text: '7%', value: 7, tone: 'text-emerald-600' }, { label: 'Landed Price Predictability', text: '100% (Guaranteed Flat Total)', value: 100, tone: 'text-emerald-600' }], points: [{ title: '1-Tap Basket Optimizer', body: 'Consolidates 3 fragmented sellers into a single local FastFulfill Hub.' }, { title: 'Preserved Price Anchor', body: 'The $15 expected price remains intact through final payment.' }] }
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
