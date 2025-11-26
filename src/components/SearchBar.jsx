const SearchBar = ({ value, onChange }) => {
  return (
    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm transition focus-within:border-indigo-400 focus-within:shadow-lg dark:border-white/15 dark:bg-slate-900/60">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-300">
        Search
      </span>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-transparent bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 dark:border-white/20 dark:bg-slate-900/40 dark:text-white dark:placeholder:text-slate-400"
      />
    </label>
  )
}

export default SearchBar

