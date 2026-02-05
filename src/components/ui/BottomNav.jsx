export default function BottomNav({activeKey = "atlas", onNavigate}) {
    const items = [
        {key: "home", icon: "home_app_logo", label: "首页"},
        {key: "atlas", icon: "grid_view", label: "图鉴"},
        {key: "sleep", icon: "bedtime", label: "睡眠"},
        {key: "me", icon: "person", label: "个人"},
    ];

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/85 backdrop-blur-md border-t border-white/10 px-6 py-3 flex justify-between items-center pb-10">
            {/*TODO: Fix layout issue with BottomNav and system navigation bar*/}
            {items.map((it) => {
                const active = it.key === activeKey;
                if (active) {
                    return (
                        <button
                            key={it.key}
                            type="button"
                            onClick={() => onNavigate?.(it.key)}
                            className="flex flex-col items-center gap-1 text-primary relative group"
                        >
                            {/* 顶部发光指示条 */}
                            <div
                                className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#ff0055]"/>
                            {/* 选中状态下图标略微放大 */}
                            <span className="font-icon scale-110">{it.icon}</span>
                        </button>
                    );
                }

                // 未选中状态保持原样 (带有 hover 显示文字的逻辑)
                return (
                    <button
                        key={it.key}
                        type="button"
                        onClick={() => onNavigate?.(it.key)}
                        className={[
                            "flex flex-col items-center gap-1 group relative",
                            "text-text-dim hover:text-white", // 移除了 active ? "text-primary" 的判断，因为 active 已经在上面处理了
                        ].join(" ")}
                    >
                        <span className="font-icon group-hover:scale-110 transition-transform">
                            {it.icon}
                        </span>
                        <span
                            className="text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 bg-black px-1">
                            {it.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
