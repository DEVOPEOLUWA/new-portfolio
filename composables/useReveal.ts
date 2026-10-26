// IntersectionObserver works whether a section scrolls vertically or slides in
// sideways on the horizontal track, so entrance animations use it instead of
// vertical ScrollTriggers.

/** Run `cb` once, the first time `el` becomes visible. Returns a cleanup. */
export function onVisible(el: Element | null | undefined, cb: () => void, threshold = 0.2) {
  if (!el) return () => {}
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      cb()
      io.disconnect()
    }
  }, { threshold })
  io.observe(el)
  return () => io.disconnect()
}

/** Call `cb(true/false)` whenever `el` enters or leaves the viewport. */
export function watchVisible(el: Element | null | undefined, cb: (visible: boolean) => void, threshold = 0) {
  if (!el) return () => {}
  const io = new IntersectionObserver((entries) => entries.forEach((e) => cb(e.isIntersecting)), { threshold })
  io.observe(el)
  return () => io.disconnect()
}
