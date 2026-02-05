export default function ToggleItem({label, desc, active, onClick, color = "primary"}) {
    const activeColor = color === "cyan" ? "bg-accent-cyan shadow-[0_0_8px_#00ffff]" : "bg-primary shadow-[0_0_8px_#ff0055]";

    return (
        <div className="flex justify-between items-center group cursor-pointer" onClick={onClick}>
            <div>
                <div className={`text-xs font-bold transition-colors ${active ? 'text-white' : 'text-text-dim'}`}>
                    {label}
                </div>
                <div className="text-[10px] text-white/30">{desc}</div>
            </div>
            {/* Custom Cyberpunk Switch */}
            <div
                className={`w-10 h-5 rounded-full border border-white/10 p-0.5 relative transition-colors duration-300 ${active ? 'bg-white/10' : 'bg-black'}`}>
                <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 shadow-sm ${active ? `translate-x-5 ${activeColor}` : 'translate-x-0 bg-text-dim'}`}/>
            </div>
        </div>
    );
}