export default function ActionButton({label, sub, icon}) {
    return (
        <div
            className="border border-white/10 bg-white/5 hover:bg-white/10 rounded p-2 flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all text-text-dim hover:text-primary">
            <span className="font-icon text-xl mb-1">{icon}</span>
            <span className="text-[10px] font-bold tracking-wider">{label}</span>
            <span className="text-nano opacity-50">{sub}</span>
        </div>
    )
}