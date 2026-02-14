import {Button} from "@/components/ui/Button";

/**
 * 动作按钮组件 — 包装 shadcn/ui Button
 * 带有装饰性大图标背景的功能卡片按钮，用于快捷指令等场景
 */
export default function ActionButton({
                                         label,
                                         sub,
                                         icon,
                                         onClick,
                                         disabled = false,
                                         iconSize = "text-7xl",
                                         iconPosition = "-top-2 -right-2",
                                     }) {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            disabled={disabled}
            className={`
                relative p-3 h-24 w-full flex flex-col justify-between items-start 
                border bg-black/40 backdrop-blur-md rounded-lg transition-all duration-300 group overflow-hidden
                ${disabled
                ? 'border-white/5 opacity-50 cursor-not-allowed'
                : 'border-white/10 hover:border-primary/50 hover:bg-white/5 active:scale-95 cursor-pointer'}`}
        >
            {/* 装饰背景 (右漂浮大图标) */}
            <div
                className={`absolute ${iconPosition} opacity-20 group-hover:opacity-80 transition-opacity pointer-events-none`}>
                <span className={`font-icon ${iconSize}`}>{icon}</span>
            </div>

            {/* 顶部标签 (Sub 属性作为技术代码) */}
            <span className={`
                text-xxxs font-mono border px-1 rounded z-10 backdrop-blur-sm
                ${disabled ? 'border-white/10 text-white/30' : 'border-primary/30 text-primary'}
            `}>
                {sub}
            </span>

            {/* 底部文字 (Label 属性作为主标题) */}
            <div className="z-10 mt-auto w-full">
                <span className={`
                    block font-display text-base tracking-wide text-left truncate
                    ${disabled ? 'text-white/40' : 'text-white group-hover:text-primary transition-colors'}
                `}>
                    {label}
                </span>
            </div>

            {/* 选中态角落光标 */}
            {!disabled && (
                <>
                    <div
                        className="absolute bottom-1.5 right-2 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-60 transition-all duration-300"/>
                    <div
                        className="absolute top-1.5 left-2 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-60 transition-all duration-300"/>
                </>
            )}
        </Button>
    );
}