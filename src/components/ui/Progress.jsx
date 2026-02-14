import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import {cn} from "@/lib/utils";

/**
 * 进度条组件 — 基于 Radix UI Progress
 * 用于展示解密进度、同步状态等百分比信息
 */
const Progress = React.forwardRef(({className, value, indicatorClassName, ...props}, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
            style={{transform: `translateX(-${100 - (value || 0)}%)`}}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export {Progress};
