import { trueCost } from '../data'

export function phoneSummary(state) {
  if (state.scenario === 1) {
    const cart = state.carts?.[1] ?? []
    const items = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    const count = cart.reduce((sum, item) => sum + item.qty, 0)
    if (state.mode === 'legacy') return { ...trueCost({ items, shipping: count ? 4.5 : 0 }), total: items + (count ? 4.5 : 0), count, savings: count ? 'Shipping visible: $4.50' : 'Cart is empty' }
    if (state.winnerPicked) return { ...trueCost({ items: state.winnerPrice }), count: 1, savings: 'True cost • delivery included' }
    return { ...trueCost({ items: count ? items : 0 }), count, savings: count ? 'AI preview • delivery included' : 'Add an item to get a recommendation' }
  }

  if (state.mode === 'legacy') {
    const shipping = cartShipping(state)
    const serviceFee = cartCount(state) ? 1.3 : 0
    return {
      ...trueCost({ items: state.purged ? 0 : cartSubtotal(state), shipping: state.purged ? 0 : shipping, serviceFee: state.purged ? 0 : serviceFee }),
      total: state.purged ? 0 : cartSubtotal(state) + shipping + serviceFee,
      count: state.purged ? 0 : cartCount(state),
      savings: state.purged ? 'Cart is empty' : 'Shipping revealed at checkout',
    }
  }

  return {
    ...trueCost({ items: cartSubtotal(state), shipping: state.consolidated ? 0 : cartShipping(state) }),
    count: cartCount(state),
    savings: state.consolidated ? 'Single Hub: FREE SHIPPING ($0.00)' : 'Split shipping detected: +$12.50',
  }
}

function cartSubtotal(state) {
  return (state.carts?.[2] ?? []).reduce((sum, item) => sum + item.price * item.qty, 0)
}

function cartCount(state) {
  return (state.carts?.[2] ?? []).reduce((sum, item) => sum + item.qty, 0)
}

function cartShipping(state) {
  return (state.carts?.[2] ?? []).reduce((sum, item) => sum + item.fee, 0)
}

const gauge = (label, text, value, tone) => ({ label, text, value, tone })

export function telemetry(state) {
  if (state.scenario === 1) {
    if (state.mode === 'legacy') {
      return {
        principle: 'Barry Schwartz Paradox of Choice',
        title: 'Scenario 1: 4 Earbuds in Cart ($94.60 Bloat & Paralysis)',
        description: 'Gen Z shoppers misuse the cart as a comparison scratchpad. Holding 4 substitute earbuds triggers high anticipated regret and analysis paralysis.',
        gauges: [gauge('Cognitive Friction Index', '89% (Severe Overload)', 89, 'text-rose-600'), gauge('Predicted Cart Abandonment Rate', '84%', 84, 'text-rose-600'), gauge('Landed Price Predictability', '38% (Vague Spec Differences)', 38, 'text-amber-600')],
        points: [
          { title: 'Scratchpad Cart Syndrome', body: 'Cart artificially surges to $94.60 across 4 redundant pairs.' },
          { title: 'Anticipated Regret', body: 'Without objective comparison, fear of poor call quality blocks checkout.' },
        ],
      }
    }

    return {
      principle: 'Barry Schwartz Paradox of Choice',
      title: 'Scenario 1: 4 Earbuds in Cart ($94.60 Bloat & Paralysis)',
      description: 'The decision engine turns a comparison scratchpad into a fast, objective recommendation.',
      gauges: [gauge('Cognitive Friction Index', '12% (Friction Neutralized)', 12, 'text-emerald-600'), gauge('Predicted Cart Abandonment Rate', '9%', 9, 'text-emerald-600'), gauge('Landed Price Predictability', '100% (Direct Heuristics)', 100, 'text-emerald-600')],
      points: [
        { title: '3-Sec Head-to-Head Showdown', body: 'Compares mic clarity, battery, and return rate rather than generic ratings.' },
        { title: 'Auto-Bench Runners Up', body: 'Unselected options move to Saved for Later, dropping active cart anxiety.' },
      ],
    }
  }

  if (state.mode === 'legacy') {
    return {
      principle: 'Richard Thaler Transaction Utility',
      title: 'Scenario 2: Split Shipping Shock ($15 Jumped to $28.80)',
      description: 'Users anchor at a $15 budget. Revealing 3 overseas carrier fees at checkout causes a spite purge.',
      gauges: [gauge('Cognitive Friction Index', '94% (Betrayal Friction)', 94, 'text-rose-600'), gauge('Predicted Cart Abandonment Rate', '89% (Spite Purge)', 89, 'text-rose-600'), gauge('Landed Price Predictability', '15% (Severe Drip Pricing)', 15, 'text-rose-600')],
      points: [
        { title: 'Destruction of Deal Value', body: 'Delivery fees almost double the cost of 3 cheap items.' },
        { title: 'Spite Cart Purge', body: 'Users delete the entire cart as an emotional reset.' },
      ],
    }
  }

  return {
    principle: 'Richard Thaler Transaction Utility',
    title: 'Scenario 2: Split Shipping Shock ($15 Jumped to $28.80)',
    description: 'The optimizer consolidates fragmented sellers before checkout so the $15 price anchor survives.',
    gauges: [gauge('Cognitive Friction Index', '8% (Seamless Flow)', 8, 'text-emerald-600'), gauge('Predicted Cart Abandonment Rate', '7%', 7, 'text-emerald-600'), gauge('Landed Price Predictability', '100% (Guaranteed Flat Total)', 100, 'text-emerald-600')],
    points: [
      { title: '1-Tap Basket Optimizer', body: 'Consolidates 3 fragmented sellers into a single local FastFulfill Hub.' },
      { title: 'Preserved Price Anchor', body: 'The $15 expected price remains intact through final payment.' },
    ],
  }
}
