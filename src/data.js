const productImages = [
  'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=480&q=85',
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=480&q=85',
  'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=480&q=85',
  'https://images.unsplash.com/photo-1631176093617-63490a3d7858?auto=format&fit=crop&w=480&q=85',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=480&q=85',
]

export const scenario1Items = [
  ['🎧', 'Baseus Bowie 30 ANC Wireless', 'Matte Black • 4.3 ★ (2.1k sold)', '22.90', productImages[0]],
  ['🎵', 'Lenovo ThinkPlus LP40 Pro', 'Pure White • 4.2 ★ (8.9k sold)', '18.50', productImages[1]],
  ['🎙️', 'SoundCore A20 Bass', 'Midnight Blue • 4.7 ★ (4.3k sold)', '26.00', productImages[2]],
  ['🎼', 'QCY T13 ANC Earbuds', 'Cloud White • 4.5 ★ (1.7k sold)', '27.20', productImages[3]],
  ['🔊', 'JBL Wave Beam Wireless', 'Black • 4.6 ★ (6.4k sold)', '31.90', productImages[4]],
  ['🎶', 'Redmi Buds 5 Lite', 'Graphite Gray • 4.4 ★ (3.8k sold)', '24.90', productImages[0]],
  ['🎤', 'Edifier X3s True Wireless', 'Ivory • 4.5 ★ (2.5k sold)', '29.50', productImages[1]],
  ['🎧', 'Haylou GT7 Neo Earbuds', 'Deep Blue • 4.3 ★ (5.1k sold)', '21.75', productImages[2]],
  ['🟣', 'Nothing Ear Stick', 'White • 4.6 ★ (1.2k sold)', '39.00', productImages[3]],
  ['🎵', 'Moondrop Space Travel', 'Black • 4.8 ★ (2.9k sold)', '35.90', productImages[4]],
  ['🔉', 'Mpow M30 In-Ear Headphones', 'Red • 4.1 ★ (1.9k sold)', '17.80', productImages[0]],
  ['🎙️', 'Anker Soundcore R50i', 'Navy Blue • 4.7 ★ (9.2k sold)', '23.40', productImages[1]],
  ['🎼', 'Skullcandy Dime 3', 'True Black • 4.4 ★ (4.6k sold)', '32.00', productImages[2]],
  ['📻', 'OnePlus Nord Buds 2r', 'Deep Gray • 4.5 ★ (7.3k sold)', '28.60', productImages[3]],
]

export const merchants = [
  ['🔌', 'Braided Type-C Fast Cable (1m)', 'Shenzhen Digital Direct', '3.00', '4.00'],
  ['📐', 'Minimalist Felt Desk Mat (L)', 'Yiwu Stationery Co.', '6.50', '4.50'],
  ['☕', 'Nordic Matte Ceramic Mug', 'Guangzhou Ceramic Goods', '5.50', '4.00'],
]

const toCartItem = ([emoji, name, meta, price, image], index) => ({
  id: `earbud-${index}`,
  emoji,
  image,
  name,
  meta,
  price: Number(price),
  qty: 1,
})

const toMerchantCartItem = ([emoji, name, seller, price, fee], index) => ({
  id: `merchant-${index}`,
  emoji,
  image: productImages[index % productImages.length],
  name,
  seller,
  price: Number(price),
  fee: Number(fee),
  qty: 1,
})

export const earbudCatalog = scenario1Items.map(toCartItem)
export const merchantCatalog = merchants.map(toMerchantCartItem)

export const initialState = {
  mode: 'optimized',
  scenario: 1,
  winnerPicked: false,
  winnerName: 'Baseus Bowie 30 ANC',
  winnerPrice: 19.9,
  purged: false,
  consolidated: false,
  pricingUpdatedAt: Date.now(),
  carts: { 1: earbudCatalog.slice(0, 4), 2: merchantCatalog },
}

// A small, deterministic recommendation model keeps the prototype fast while
// making the decision criteria explicit. A production adapter can replace the
// prices without changing the UI or scoring contract.
export const recommendationSignals = {
  micClarity: 0.35,
  battery: 0.2,
  reliability: 0.2,
  delivery: 0.15,
  value: 0.1,
}

export const recommendationCandidates = [
  { name: 'Baseus Bowie 30 ANC', price: 19.9, match: 98, micClarity: 9.4, battery: 30, reliability: 9.6, delivery: 9.8, value: 9.7, emoji: '🎧' },
  { name: 'SoundCore A20 Bass', price: 26, match: 87, micClarity: 7.8, battery: 24, reliability: 8.4, delivery: 6.5, value: 8.1, emoji: '🎙️' },
]

export function rankRecommendations(candidates = recommendationCandidates) {
  return candidates
    .map((candidate) => ({
      ...candidate,
      score: Object.entries(recommendationSignals).reduce(
        (total, [signal, weight]) => total + candidate[signal] * weight,
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score)
}

export function trueCost({ items = 15, shipping = 0, serviceFee = 0, savings = 0 } = {}) {
  return {
    items,
    shipping,
    serviceFee,
    savings,
    total: Math.max(0, items + shipping + serviceFee - savings),
  }
}

export function formatFreshness(timestamp) {
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
  return seconds < 10 ? 'Just now' : `${seconds}s ago`
}
