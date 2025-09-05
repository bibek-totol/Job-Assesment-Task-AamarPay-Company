export default function FilterSection({ title, children }) {
    return (
      <div className="rounded-2xl bg-neutral-900 p-4 shadow border border-neutral-800">
        <h4 className="mb-3 text-sm font-semibold text-neutral-200 uppercase tracking-wide">{title}</h4>
        <div className="space-y-2 text-neutral-400">{children}</div>
      </div>
    );
  }