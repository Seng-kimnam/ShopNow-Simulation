export function Button({ children, className = "", ...props }) {
  return (
    <button className={`transition active:scale-95 ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Price({ value }) {
  const [whole, cents] = value.toFixed(2).split(".");
  return (
    <span className="flex items-baseline">
      <span className="mr-0.5 text-[11px] font-bold text-shopee">$</span>
      <span className="text-[17px] font-extrabold leading-none tracking-tight text-shopee">
        {whole}
      </span>
      <span className="text-[11px] font-bold text-shopee">.{cents}</span>
    </span>
  );
}

export function Overlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      {children}
    </div>
  );
}
