import {Switch} from "@/components/ui/switch";

/**
 * 切换项组件 — 包装 shadcn/ui Switch
 * 用于设置页面中的开关选项，包含标签和描述
 * @param {string|React.ReactNode} label - 选项标签
 * @param {string} desc - 选项描述
 * @param {boolean} active - 当前开关状态
 * @param {function} onClick - 点击回调
 * @param {string} color - 高亮颜色（"primary" | "cyan"）
 */
export default function ToggleItem({label, desc, active, onClick, color = "primary"}) {
    // 根据颜色决定开关的自定义样式
    const switchClass = color === "cyan"
        ? "data-[state=checked]:bg-accent-cyan data-[state=checked]:shadow-[0_0_8px_#00ffff]"
        : "";

    return (
        <div className="flex justify-between items-center group cursor-pointer" onClick={onClick}>
            <div>
                <div className={`text-xs font-bold transition-colors ${active ? 'text-white' : 'text-text-dim'}`}>
                    {label}
                </div>
                <div className="text-[10px] text-white/30">{desc}</div>
            </div>
            {/* 使用 shadcn/ui Switch 替代自定义开关 */}
            <Switch
                checked={active}
                onCheckedChange={() => onClick?.()}
                className={switchClass}
            />
        </div>
    );
}