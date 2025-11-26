const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle color theme"
      className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/40 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-700"
    >
      <span className="text-base">{isDark ? '🌙' : '☀️'}</span>
      {isDark ? 'Dark mode' : 'Light mode'}
    </button>
  )
}

export default ThemeToggle

