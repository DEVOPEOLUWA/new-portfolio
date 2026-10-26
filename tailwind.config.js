/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        pop: 'var(--pop)',
        pop2: 'var(--pop2)',
        pop3: 'var(--pop3)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Unbounded"', 'ui-monospace', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
    },
  },
}
