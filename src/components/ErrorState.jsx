const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="rounded-3xl border border-rose-200/60 bg-rose-50/80 p-6 text-rose-700 shadow-sm dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-100">
      <p className="text-sm font-semibold">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorState

