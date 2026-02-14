import {cn} from "@/lib/utils";

/**
 * 骨架屏组件 — 加载占位符
 * 用于内容加载时的视觉反馈，显示脉冲动画的灰色色块
 */
function Skeleton({className, ...props}) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    );
}

export {Skeleton};
