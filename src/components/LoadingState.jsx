const LoadingState = ({ label = 'Loading products…' }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-slate-300/80 bg-white/70 px-10 py-8 text-center shadow-inner dark:border-white/10 dark:bg-white/5"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-500 dark:border-white/20 dark:border-t-cyan-300" />
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}

export default LoadingState

