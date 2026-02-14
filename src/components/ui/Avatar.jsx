import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {cn} from "@/lib/utils";

/**
 * 头像组件 — 基于 Radix UI Avatar
 * 用于个人资料页展示用户头像，支持图片加载失败时的回退文本
 */
const Avatar = React.forwardRef(({className, ...props}, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
    />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({className, ...props}, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
    />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(({className, ...props}, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
        {...props}
    />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export {Avatar, AvatarImage, AvatarFallback};
