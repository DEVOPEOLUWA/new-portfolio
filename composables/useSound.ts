// Tiny synthesized UI sounds (no audio files). Off until the visitor turns it on.
let ctx: AudioContext | null = null

export function useSound() {
  const enabled = useState('sound', () => false)

  function audio() {
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  }

  function blip(freq = 600, duration = 0.06, type: OscillatorType = 'square', gain = 0.04) {
    if (!enabled.value || typeof window === 'undefined') return
    const a = audio()
    const osc = a.createOscillator()
    const g = a.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, a.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, a.currentTime + duration)
    g.gain.setValueAtTime(gain, a.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + duration)
    osc.connect(g).connect(a.destination)
    osc.start()
    osc.stop(a.currentTime + duration)
  }

  // A mechanical-keyboard-ish "thock"
  function thock(pitch = 1) {
    blip(180 * pitch, 0.05, 'triangle', 0.09)
    blip(1800 * pitch, 0.015, 'square', 0.015)
  }

  function toggle() {
    enabled.value = !enabled.value
    if (enabled.value) blip(880, 0.08, 'sine', 0.05)
  }

  return { enabled, toggle, blip, thock }
}
