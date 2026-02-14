import * as React from "react";
import {cva} from "class-variance-authority";
import {cn} from "@/lib/utils";

/**
 * 徽章组件 — 基于 shadcn/ui 的 Badge
 * 用于状态标签、分类标识等小型标记
 */
const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-white shadow hover:bg-primary/80",
                secondary: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
                destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground",
                warning: "border-transparent bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({className, variant, ...props}) {
    return (
        <div className={cn(badgeVariants({variant}), className)} {...props} />
    );
}

export {Badge, badgeVariants};
