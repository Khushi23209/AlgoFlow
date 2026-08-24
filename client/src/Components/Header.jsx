export default function Header({ isLoggedIn, onLoginClick, onLogout, problemId, onProblemChange }) {
  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500 text-lg font-bold text-white">
            A
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">AlgoFlow</h1>
            <p className="text-xs text-slate-500">Visualize • Understand • Master</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={problemId}
            onChange={(e) => onProblemChange(Number(e.target.value))}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
          >
            <option value={1}>Bubble Sort</option>
            <option value={2}>Binary Search</option>
            <option value={3}>Selection Sort</option>
          </select>

          {isLoggedIn ? (
            <button onClick={onLogout} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Log Out
            </button>
          ) : (
            <button onClick={onLoginClick} className="rounded-xl border border-pink-500 px-5 py-2.5 text-sm font-semibold text-pink-600 transition hover:bg-pink-50">
              Log In / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
}