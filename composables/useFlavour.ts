export type Flavour = 'midnight' | 'ube' | 'bubblegum' | 'daydream'

export const FLAVOURS: { id: Flavour; label: string; swatch: string; theme: string }[] = [
  { id: 'midnight', label: 'Midnight', swatch: '#120d26', theme: '#120d26' },
  { id: 'ube', label: 'Ube', swatch: '#5b3df5', theme: '#5b3df5' },
  { id: 'bubblegum', label: 'Bubblegum', swatch: '#ff8fcb', theme: '#ff8fcb' },
  { id: 'daydream', label: 'Daydream', swatch: 'linear-gradient(135deg, #e4dcff, #ffd9ec 55%, #c9f5e4)', theme: '#e4dcff' },
]

const KEY = 'rachy:flavour'

export function useFlavour() {
  const flavour = useState<Flavour>('flavour', () => 'midnight')

  function sync() {
    const attr = document.documentElement.getAttribute('data-flavour') as Flavour | null
    if (attr && FLAVOURS.some((f) => f.id === attr)) flavour.value = attr
  }

  function setFlavour(next: Flavour) {
    flavour.value = next
    document.documentElement.setAttribute('data-flavour', next)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', FLAVOURS.find((f) => f.id === next)!.theme)
    try { localStorage.setItem(KEY, next) } catch { /* private mode */ }
  }

  return { flavour, setFlavour, sync }
}
