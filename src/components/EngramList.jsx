import React from 'react';
import {Badge} from './ui/badge';
import {Progress} from './ui/progress';

// 辅助函数：获取稀有度样式
const getRarityStyles = (rarity) => {
    switch (rarity) {
        case "legendary":
            return "border-yellow-400/50 text-yellow-400 bg-yellow-400/5 shadow-[0_0_15px_rgba(250,204,21,0.2)]";
        case "epic":
            return "border-purple-400/50 text-purple-400 bg-purple-400/5 shadow-[0_0_15px_rgba(192,132,252,0.2)]";
        case "rare":
            return "border-cyan-400/50 text-cyan-400 bg-cyan-400/5";
        default:
            return "border-white/20 text-white bg-white/5"; // common
    }
};

export default function EngramList({engrams, onSelect}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {engrams.map((engram) => {
                const isLocked = engram.status === "locked";
                const isParsing = engram.status === "parsing";
                const styles = getRarityStyles(engram.rarity);

                return (
                    <button
                        key={engram.id}
                        onClick={() => !isLocked && !isParsing && onSelect(engram)}
                        disabled={isLocked || isParsing}
                        className={`relative text-left rounded-xl border p-3 flex flex-col gap-2 
                            ${isLocked
                            ? "border-white/5 bg-transparent blur-cipher cursor-not-allowed"
                            : `bg-black/40 backdrop-blur-sm hover:bg-white/5 border-white/10 ${styles} cursor-pointer group`
                        }
                        `}
                    >
                        {/* Header: Icon & Rarity */}
                        <div className="flex justify-between items-start relative z-10">
                            <span className={`font-icon text-2xl ${isLocked ? 'text-white/20' : ''}`}>
                                {isLocked ? 'lock' : engram.icon}
                            </span>
                            {!isLocked && (
                                <Badge variant="secondary" className="opacity-70">
                                    {engram.rarity}
                                </Badge>
                            )}
                        </div>

                        <div className="relative z-10 w-full">
                            <h3 className={`text-xs font-bold mb-1 truncate ${isLocked ? 'text-text-dim' : 'text-white'}`}>
                                {isLocked ? "ENCRYPTED" : engram.name}
                            </h3>

                            {isParsing ? (
                                <div className="mt-1 w-full">
                                    <div className="flex justify-between text-nano text-text-dim mb-1 font-mono">
                                        <span>解析中...</span>
                                        <span>{engram.progress}%</span>
                                    </div>
                                    <Progress
                                        value={engram.progress}
                                        className="h-1"
                                        indicatorClassName="animate-pulse"
                                    />
                                </div>
                            ) : (
                                <p className="text-xxxs text-text-dim leading-tight h-8 overflow-hidden line-clamp-2">
                                    {isLocked ? "Wait for sync..." : engram.desc}
                                </p>
                            )}
                        </div>

                        {/* Unlocked 状态下的装饰性全息扫描 */}
                        {!isLocked && !isParsing && (
                            <div className="absolute inset-0 holo-scan pointer-events-none opacity-30 rounded-xl"/>
                        )}

                        {/* 装饰性背景网格 */}
                        {!isLocked && (
                            <div className="absolute inset-0 effect-scanlines-soft rounded-xl"/>
                        )}
                    </button>
                );
            })}
        </div>
    );
}