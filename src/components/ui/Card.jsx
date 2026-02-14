import * as React from "react";
import {cn} from "@/lib/utils";

/**
 * 卡片组件 — 基于 shadcn/ui 的 Card
 * 由 Card / CardHeader / CardTitle / CardDescription / CardContent / CardFooter 组成
 * @prop {boolean|string} hud - 是否显示 HUD 装饰光标。true/"static" 为常驻，"hover" 为悬停显示
 */
const Card = React.forwardRef(({className, hud, children, ...props}, ref) => {
    // HUD 光标渲染逻辑
    const renderHudCursors = () => {
        if (!hud) return null;

        // 基础样式：绝对定位，白色边框，过渡效果
        const baseClass = "absolute w-2 h-2 border-white/40 transition-all duration-300 pointer-events-none z-0";

        // 状态样式：根据 hud 属性决定是常驻还是悬停显示
        // "hover" 模式下默认透明度为 0，悬停时变为 100% (或者你可以调低一点比如 opacity-50)
        // 默认模式下透明度设为 opacity-50 (即 border-white/20 的 50% 视觉强度)，避免太抢眼
        const stateClass = hud === "hover"
            ? "opacity-20 group-hover:opacity-100"
            : "opacity-30";

        return (
            <>
                <div className={cn(baseClass, stateClass, "top-1.5 left-1.5 border-t border-l")}/>
                <div className={cn(baseClass, stateClass, "top-1.5 right-1.5 border-t border-r")}/>
                <div className={cn(baseClass, stateClass, "bottom-1.5 left-1.5 border-b border-l")}/>
                <div className={cn(baseClass, stateClass, "bottom-1.5 right-1.5 border-b border-r")}/>
            </>
        );
    };

    return (
        <div
            ref={ref}
            // 添加 relative 和 group 以支持绝对定位子元素和悬停效果
            className={cn("rounded-lg border border-border bg-card text-card-foreground shadow-sm relative group", className)}
            {...props}
        >
            {renderHudCursors()}
            {children}
        </div>
    );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({className, ...props}, ref) => (
    <h3
        ref={ref}
        className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({className, ...props}, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("p-6 pt-0", className)}
        {...props}
    />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent};
