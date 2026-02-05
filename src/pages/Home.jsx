import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// 引入组件库
import BottomNav from "../components/ui/BottomNav.jsx";
import LayoutEffects from "../components/layout/LayoutEffects";
import ActionButton from "../components/ui/ActionButton";
import BilingualText from "../components/ui/BilingualText";
import EntityCard from "../components/EntityCard";
import LockedCard from "../components/LockedCard";
import BroadcastTicker from "../components/BroadcastTicker";
import CircadianDial from "../components/CircadianDial";
import {broadcastMessages, feedItems, quickActions} from "../data/home-data";
import {currentUser} from "../data/user-data"; // 假设这里有用户名

export default function Home() {
    const navigate = useNavigate();

    // --- State Management ---
    const [booted, setBooted] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState(15); // 现实调频器数值
    const [syncProgress, setSyncProgress] = useState(currentUser?.stats?.stability?.val || 64); // 模拟初始同步值

    // --- Effects ---
    useEffect(() => {
        document.title = "控制台 | COMMAND";
        // 开场动画延迟
        const timer = setTimeout(() => setBooted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // 模拟点击同步按钮
    const handleSync = () => {
        if (syncProgress < 100) {
            setSyncProgress(prev => Math.min(100, prev + 10));
        }
    };

    return (
        <div className="layout-page layout-frame font-mono text-white relative min-h-screen">

            {/* 1. 全局特效层：受 Noise Level 控制 */}
            <LayoutEffects
                noise={noiseLevel > 50 ? "strong" : "soft"}
                scanlines={true}
            />

            {/* 高噪点模式下的隐藏彩蛋 (Visual Noise Overlay) */}
            <div
                className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay transition-opacity duration-300"
                style={{opacity: (noiseLevel - 20) / 100}}
            >
                <div className="w-full h-full bg-noise opacity-50"/>
            </div>

            {/* --- Header Area: Welcome & Status --- */}
            <header
                className={`shrink-0 p-5 pb-0 flex justify-between items-start transition-all duration-700 ${booted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div>
                    <div className="flex items-center gap-2 text-primary mb-1">
                        <span className="font-icon text-sm">terminal</span>
                        <span className="text-xs font-bold tracking-widest">COMMAND CENTER</span>
                    </div>
                    <h1 className="text-xl font-display font-bold tracking-wide text-white">
                        WELCOME, <span className="text-text-dim">{currentUser.name}</span>
                    </h1>
                    <div className="text-[10px] text-text-dim mt-1 flex gap-2">
                        <span>// DATE: 2077.11.02</span>
                        <span className={noiseLevel > 80 ? "text-red-500 font-bold animate-pulse" : ""}>
                            // REALITY: {noiseLevel > 80 ? "UNSTABLE" : "STABLE"}
                        </span>
                    </div>
                </div>
                {/* 简单的天气/环境图标 */}
                <div className="glass-card p-2 rounded flex flex-col items-center justify-center w-12 h-12">
                    <span className="font-icon text-xl text-teal-400">cloud</span>
                    <span className="text-[9px] font-bold">24°C</span>
                </div>
            </header>

            {/* --- Main Scrollable Area --- */}
            <main className="px-5 pb-32 pt-2 relative z-10">

                {/* --- Section 1: Hero / Daily Sync --- */}
                {/* 融合点：使用 Circadian Dial 展示 User 的 Daily Mission 状态 */}
                <section
                    onClick={handleSync}
                    className={`transition-all duration-700 delay-100 ${booted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                    <CircadianDial progress={syncProgress}/>

                    {/* 辅助操作提示 */}
                    <div className="text-center -mt-4 mb-6">
                        <p className="text-[10px] text-text-dim animate-pulse">
                            {syncProgress >= 100 ? "SYNC COMPLETE" : "TAP TO STABILIZE WAVEFORM"}
                        </p>
                    </div>
                </section>

                {/* --- Section 2: Quick Command Grid --- */}
                {/* 融合点：使用 User 指定的 ActionButton，但放在网格布局中 */}
                <section
                    className={`mb-6 transition-all duration-700 delay-200 ${booted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <BilingualText cn="快捷指令" en="TACTICAL_DECK" className="text-xs font-bold"/>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action, idx) => (
                            <ActionButton
                                key={idx}
                                icon={action.icon}
                                label={action.label}
                                sub={action.sub}
                                onClick={() => action.sub === 'ATLAS' && navigate('/atlas')}
                                disabled={idx === 2} // 示例：禁用第三个按钮
                            />
                        ))}
                    </div>
                </section>

                {/* --- Section 3: Reality Tuner & Discovery Feed --- */}
                {/* 融合点：Slider 控制 Feed 流的感知 */}
                <section
                    className={`transition-all duration-700 delay-300 ${booted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                    {/* Tuner Control */}
                    <div className="glass-card p-3 rounded-xl border border-white/10 mb-4 bg-black/40">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-text-dim flex items-center gap-2">
                                <span className="font-icon text-xs">tune</span>
                                REALITY_FILTER
                            </span>
                            <span className={`font-mono text-xs ${noiseLevel > 70 ? 'text-primary' : 'text-teal-400'}`}>
                                {noiseLevel}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={noiseLevel}
                            onChange={(e) => setNoiseLevel(Number(e.target.value))}
                            className="cyber-range"
                        />
                    </div>

                    {/* Feed Title */}
                    <div className="flex items-center justify-between mb-3 px-1 border-b border-white/5 pb-1">
                        <BilingualText cn="截获信号" en="INTERCEPTED_FEED" className="text-xs font-bold"/>
                        <span className="text-[9px] text-text-dim">
                            {noiseLevel > 60 ? "HIDDEN_ENTITIES_VISIBLE" : "STANDARD_MODE"}
                        </span>
                    </div>

                    {/* Feed Items List */}
                    <div className="space-y-3">
                        {feedItems.map((item) => {
                            // 简单的逻辑：如果是 'locked' 类型，且 noiseLevel 不够高，则显得更加模糊或不可见
                            const isRevealed = noiseLevel > 80;

                            if (item.type === 'locked') {
                                return (
                                    <div key={item.id} className={isRevealed ? "animate-pulse" : ""}>
                                        <LockedCard
                                            requiredLevel={item.requiredLevel}
                                            coverUrl={item.coverUrl}
                                        />
                                        {isRevealed &&
                                            <div className="text-center text-[9px] text-primary mt-1">GHOST SIGNAL
                                                DETECTED</div>}
                                    </div>
                                );
                            }

                            return (
                                <EntityCard
                                    key={item.id}
                                    code={item.code}
                                    title={item.title}
                                    coverUrl={item.coverUrl}
                                    status={item.status}
                                    progress={item.progress}
                                />
                            );
                        })}
                        {/* Empty Spacer for scroll */}
                        <div className="h-4"/>
                    </div>
                </section>
            </main>

            {/* --- Footer Fixed Area --- */}
            <BroadcastTicker messages={broadcastMessages}/>
            <BottomNav activeKey="home"/>
        </div>
    );
}