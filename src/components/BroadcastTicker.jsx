import React from 'react';

/**
 * 全局广播滚动条组件
 * @param {string[]} messages - 要滚动显示的广播消息列表
 */
export default function BroadcastTicker({messages}) {
    return (
        <div
            className="fixed bottom-8 left-0 right-0 z-20 mb-10 w-full bg-black/80 border-t border-white/10 h-8 flex items-center overflow-hidden backdrop-blur-md">
            {/* 左右渐变遮罩 */}
            <div
                className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background-dark to-transparent z-10"/>
            <div
                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background-dark to-transparent z-10"/>

            <div className="animate-marquee whitespace-nowrap flex gap-12 items-center min-w-full">
                {messages.map((msg, idx) => (
                    <span key={idx}
                          className="text-xxs font-mono text-primary/80 tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_5px_#ff0055]"/>
                        <span className="opacity-80">[{msg}]</span>
                    </span>
                ))}
            </div>
        </div>
    );
}