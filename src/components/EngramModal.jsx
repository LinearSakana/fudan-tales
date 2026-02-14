import React, {useEffect, useState} from 'react';
import BilingualText from './ui/BilingualText';
import {Button} from './ui/button';

export default function EngramModal({engram, onClose}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // 控制进入动画
    useEffect(() => {
        let rafId = 0;
        if (engram && !isVisible && !isClosing) {
            rafId = requestAnimationFrame(() => setIsVisible(true));
        } else if (!engram && (isVisible || isClosing)) {
            rafId = requestAnimationFrame(() => {
                setIsVisible(false);
                setIsClosing(false);
            });
        }
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [engram, isVisible, isClosing]);

    if (!engram) return null;

    const handleClose = () => {
        setIsVisible(false);
        setIsClosing(true);
        // 等待动画结束后再销毁
        setTimeout(onClose, 300);
    };

    const handleDeepDive = () => {
        // 跳转到详情页 (假设路由结构为 /atlas/:code)
        // 这里假设 engram.id 或 code 可以作为参数
        // navigate(`/.../${engram.id}`);
    };

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center px-6 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* 1. 背景层：点击空白处关闭 */}
            <div
                className="absolute inset-0 backdrop-neural-focus transition-all duration-500"
                onClick={handleClose}
            />

            {/* 2. Modal 主体 */}
            <div className={`
                relative w-full max-w-sm bg-[#0f0508] border-2 border-primary/50 text-white rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,0,85,0.3)]
                flex flex-col
                ${isVisible ? 'animate-modal-entry' : 'scale-95 opacity-0'}
            `}>
                {/* 装饰：背景网格与噪点 */}
                <div className="absolute inset-0 effect-grid-soft"/>
                <div className="absolute inset-0 effect-noise-soft"/>

                {/* 顶部状态条 */}
                <div
                    className="bg-primary/10 border-b border-primary/30 p-3 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping"/>
                        <span className="text-xxs font-mono tracking-widest text-primary font-bold">
                            ARCHIVE_ENTRY // {engram.id}
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleClose} className="text-primary hover:text-white">
                        <span className="font-icon">close</span>
                    </Button>
                </div>

                {/* 内容区域 */}
                <div className="p-5 relative z-10 space-y-4">

                    {/* 标题 */}
                    <div>
                        <BilingualText cn={engram.name} en="CLASSIFIED MEMORY" className="text-xl text-gray-300"/>
                        <div className="h-px w-full bg-gradient-to-r from-primary to-transparent mt-2 opacity-50"/>
                    </div>

                    {/* 图像/可视化 (左图右文布局的变体) */}
                    <div className="relative w-full h-40 bg-black border border-white/10 rounded overflow-hidden group">
                        <div className="absolute inset-0 effect-scanlines-soft z-20"/>
                        <div className="w-full h-full flex items-center justify-center bg-surface-dark">
                            {/* 这里的 Icon 只是占位，实际项目可能显示大图 */}
                            <span
                                className="font-icon text-6xl text-white/20 group-hover:text-primary/80 transition-colors duration-500 group-hover:scale-110 transform">
                                {engram.icon}
                            </span>
                        </div>

                        {/* 悬浮覆盖层 */}
                        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
                            <span className="text-xxxs font-mono text-white/70 bg-black/50 px-1 rounded">
                                LAT: {engram.location_lat_long || "UNKNOWN"}
                            </span>
                        </div>
                    </div>

                    {/* 文本描述 */}
                    <div className="space-y-2">
                        <p className="text-xs text-text-dim font-mono leading-relaxed border-l-2 border-white/10 pl-3">
                            {engram.desc || "Data corrupted. Semantic reconstruction required."}
                        </p>
                        <p className="text-xxs text-primary/60 font-mono mt-2">
                            // DANGER_LEVEL: {engram.rarity ? engram.rarity.toUpperCase() : "N/A"}
                        </p>
                    </div>

                    {/* 底部操作区 */}
                    <div className="pt-4 mt-2 border-t border-dashed border-white/10 flex gap-8">
                        <Button
                            className="flex-1 py-3 h-auto group"
                            onClick={handleDeepDive}
                        >
                            <span className="font-icon text-sm">manage_search</span>
                            FULL DECRYPTION
                        </Button>

                        <Button
                            variant="secondary"
                            className="px-4 py-3 h-auto"
                        >
                            <span className="font-icon">share</span>
                        </Button>
                    </div>
                </div>

                {/* 底部装饰条 */}
                <div className="h-1 w-full bg-primary-dark relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-primary animate-[holo-sweep_2s_infinite]"/>
                </div>
            </div>
        </div>
    );
}
