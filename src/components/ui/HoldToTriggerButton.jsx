import React, {useRef, useState, useEffect} from 'react';
import {cn} from "@/lib/utils";

/**
 * 长按触发按钮组件
 * @param {Function} onTrigger - 触发回调
 * @param {number} holdDuration - 长按时间 (ms)
 * @param {React.ReactNode} children - 按钮内容
 * @param {string} className - 自定义样式
 * @param {boolean} disabled - 是否禁用
 */
export default function HoldToTriggerButton({
                                                onTrigger,
                                                holdDuration = 1500,
                                                children,
                                                className,
                                                disabled = false,
                                                ...props
                                            }) {
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [triggered, setTriggered] = useState(false);
    const requestRef = useRef();
    const startTimeRef = useRef();

    const reset = () => {
        setIsHolding(false);
        setProgress(0);
        setTriggered(false);
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = null;
        }
    };

    const animate = (time) => {
        if (!startTimeRef.current) startTimeRef.current = time;
        const elapsed = time - startTimeRef.current;
        const newProgress = Math.min((elapsed / holdDuration) * 100, 100);

        setProgress(newProgress);

        if (newProgress < 100) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            // Trigger!
            setTriggered(true);
            setIsHolding(false);
            if (onTrigger) onTrigger();
            // Reset after a delay or let parent handle?
            // Usually we want to wait for parent state change, but here we just reset visually after a moment if not unmounted
            setTimeout(() => {
                setProgress(0);
                setTriggered(false);
            }, 500);
        }
    };

    const startHolding = (e) => {
        if (disabled || triggered) return;
        // e.preventDefault(); // Prevent context menu on mobile?
        setIsHolding(true);
        startTimeRef.current = null;
        requestRef.current = requestAnimationFrame(animate);
    };

    const stopHolding = () => {
        if (triggered) return;
        reset();
    };

    // Clean up
    useEffect(() => {
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <button
            className={cn(
                "relative overflow-hidden group select-none touch-none active:scale-95 transition-transform duration-100",
                className
            )}
            onMouseDown={startHolding}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchStart={startHolding}
            onTouchEnd={stopHolding}
            disabled={disabled}
            {...props}
        >
            {/* Background Fill Progress (Striped) */}
            <div
                className="absolute inset-0 bg-primary/20 transition-all ease-linear"
                style={{
                    width: `${progress}%`,
                    opacity: isHolding ? 1 : 0,
                    transitionDuration: isHolding ? '0ms' : '300ms',
                    backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)',
                    backgroundSize: '10px 10px'
                }}
            />

            {/* Scanline Effect on Hold */}
            {isHolding && (
                <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none"/>
            )}

            {/* Trigger Flash */}
            {triggered && (
                <div className="absolute inset-0 bg-primary animate-pulse"/>
            )}

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </div>

            {/* Border Glitch visuals */}
            <div
                className={`absolute inset-0 border-2 transition-colors duration-300 ${isHolding ? 'border-primary' : 'border-white/10'}`}/>

            {/* Corner Brackets */}
            <div
                className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-300 ${isHolding ? 'border-primary' : 'border-white/30'}`}/>
            <div
                className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-300 ${isHolding ? 'border-primary' : 'border-white/30'}`}/>
            <div
                className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-300 ${isHolding ? 'border-primary' : 'border-white/30'}`}/>
            <div
                className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300 ${isHolding ? 'border-primary' : 'border-white/30'}`}/>
        </button>
    );
}
