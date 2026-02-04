export default function LockedCard({requiredLevel = 5, coverUrl}) {
    return (
        <div className="glass-card rounded-lg overflow-hidden relative border-white/5">
            <div
                className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/40 backdrop-blur-[2px]">
                <div
                    className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,85,0.02)_10px,rgba(255,0,85,0.02)_20px)]"></div>
                <span className="font-icon text-text-dim text-4xl mb-2 opacity-50">lock</span>
                <p className="text-xs font-bold text-text-dim tracking-widest">已加密</p>
                <p className="text-[9px] text-text-dim/60 mt-1">{requiredLevel} 级权限需求</p>
            </div>

            <div
                className="aspect-[4/5] w-full bg-cover bg-center opacity-30 grayscale contrast-150"
                style={{backgroundImage: `url("${coverUrl}")`}}
            />

            <div className="absolute bottom-0 left-0 w-full p-3 z-10 opacity-30">
                <p className="text-[10px] text-white font-mono mb-0.5">SCP-FD-???</p>
                <div className="h-3 w-2/3 bg-white/20 rounded-sm"/>
            </div>
        </div>
    );
}
