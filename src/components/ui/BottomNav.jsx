import {useNavigate, useLocation} from "react-router-dom";
import {Button} from "./Button";
import {navItems} from "@/config/nav-config";

export default function BottomNav({
                                      activeKey,
                                      onNavigate
                                  }) {
    const navigate = useNavigate();
    const location = useLocation();

    // 如果没有传入 activeKey，尝试从 URL 推断 (简单匹配)
    // 实际项目中可能由父组件控制 activeKey 更稳妥
    const currentKey = activeKey || navItems.find(item => location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)))?.key || "home";

    const handleNavigate = (key) => {
        if (onNavigate) {
            onNavigate(key, navigate);
            return;
        }
        const item = navItems.find(i => i.key === key);
        if (item) {
            navigate(item.path);
        }
    };

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/85 backdrop-blur-md border-t border-white/10 px-6 py-3 flex justify-between items-center pb-8 safe-area-pb text-xl">
            {navItems.map((it) => {
                const active = it.key === currentKey;
                if (active) {
                    return (
                        <Button
                            key={it.key}
                            variant="ghost"
                            onClick={() => handleNavigate(it.key)}
                            className="flex flex-col items-center gap-1 text-primary relative group h-auto p-0 hover:bg-transparent"
                        >
                            {/* 顶部发光指示条 */}
                            <div
                                className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#ff0055]"/>
                            {/* 选中状态下图标略微放大 */}
                            <span className="font-icon scale-125">{it.icon}</span>
                        </Button>
                    );
                }

                // 未选中状态保持原样 (带有 hover 显示文字的逻辑)
                return (
                    <Button
                        key={it.key}
                        variant="ghost"
                        onClick={() => handleNavigate(it.key)}
                        className="flex flex-col items-center gap-1 group relative text-text-dim hover:text-white h-auto p-0 hover:bg-transparent"
                    >
                        <span className="font-icon group-hover:scale-125 transition-transform">
                            {it.icon}
                        </span>
                        <span
                            className="text-xxs whitespace-nowrap font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 bg-black px-1">
                            {it.label}
                        </span>
                    </Button>
                );
            })}
        </nav>
    );
}
