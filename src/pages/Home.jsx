import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import BottomNav from "../components/ui/BottomNav.jsx";
import LayoutEffects from "../components/layout/LayoutEffects";
import BilingualText from "../components/ui/BilingualText";
import BroadcastTicker from "../components/BroadcastTicker";
import CircadianDial from "../components/CircadianDial";
import {broadcastMessages, tacticalModules} from "../data/home-data";

export default function Home() {
    const navigate = useNavigate();

    // --- State ---
    const [booted, setBooted] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState(10); // 0 - 100
    const [stability, setStability] = useState(94);

    // --- Effects ---
    useEffect(() => {
        document.title = "控制台 | COMMAND";
        const timer = setTimeout(() => setBooted(true), 100);

        // 模拟稳定性波动
        const interval = setInterval(() => {
            setStability(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1))));
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    // 处理导航跳转
    const handleActionClick = (id) => {
        if (id === 'map') navigate('/atlas');
        // 其他路由逻辑...
    };

    return (
        <div className="layout-page layout-frame font-mono text-white relative">

            {/* 创新点 2: 交互式现实调谐器
               Slider 的值直接控制 LayoutEffects 的噪点强度
            */}
            <LayoutEffects
                noise={noiseLevel > 50 ? "strong" : "soft"}
                scanlines={true}
                glitchIntensity={noiseLevel / 100} // 假设 LayoutEffects 支持此 prop，或作为扩展思路
            />

            {/* 如果噪点调得很高，显示隐藏图层 */}
            {noiseLevel > 80 && (
                <div
                    className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center mix-blend-overlay opacity-30">
                    <h1 className="text-9xl font-black text-red-600 rotate-12 blur-sm">WAKE UP</h1>
                </div>
            )}

            {/* --- Header --- */}
            <header
                className={`p-5 flex justify-between items-end border-b border-white/10 bg-black/20 backdrop-blur-sm transition-all duration-500 ${booted ? 'opacity-100' : 'opacity-0 -translate-y-2'}`}>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div
                            className={`w-2 h-2 rounded-full ${stability > 80 ? 'bg-teal-400 shadow-[0_0_8px_#2dd4bf]' : 'bg-red-500 animate-pulse'}`}/>
                        <span className="text-[10px] tracking-widest text-text-dim">NET_STATUS: ONLINE</span>
                    </div>
                    <BilingualText cn="现实锚点" en="REALITY ANCHOR" className="text-lg font-bold"/>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-text-dim mb-0.5">DAY 142</div>
                    <div className="font-display text-xl text-white tracking-wider">20:42 PM</div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-5 pb-32 pt-4 relative z-10 scroll-smooth">

                {/* --- Section 1: Visual Clock (The Circadian Dial) --- */}
                <section
                    className={`transition-all duration-700 delay-100 ${booted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <CircadianDial stability={stability}/>

                    {/* 辅助数据 */}
                    <div className="flex justify-between px-2 mt-4 text-center">
                        <div>
                            <div className="text-[9px] text-text-dim uppercase tracking-widest">REM Index</div>
                            <div className="font-mono text-primary text-sm">1.28σ</div>
                        </div>
                        <div>
                            <div className="text-[9px] text-text-dim uppercase tracking-widest">Sync Rate</div>
                            <div className="font-mono text-teal-400 text-sm">98.2%</div>
                        </div>
                    </div>
                </section>

                {/* --- Section 2: Tactical Deck (Grid) --- */}
                <section
                    className={`mt-8 transition-all duration-700 delay-200 ${booted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1 h-3 bg-primary"/>
                        <span className="text-xs font-bold tracking-widest text-white/80">TACTICAL DECK</span>
                        <div className="h-[1px] flex-1 bg-white/10"/>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {tacticalModules.map((item) => (
                            <button
                                key={item.id}
                                disabled={item.disabled}
                                onClick={() => handleActionClick(item.id)}
                                className={`
                                    relative p-4 h-24 flex flex-col justify-between items-start 
                                    border bg-black/40 backdrop-blur-md rounded-lg transition-all duration-300 group overflow-hidden
                                    ${item.disabled ? 'border-white/5 opacity-50 cursor-not-allowed' : 'border-white/10 hover:border-primary/50 hover:bg-white/5 active:scale-95'}
                                `}
                            >
                                {/* 装饰背景 */}
                                <div
                                    className="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="font-icon text-4xl">{item.icon}</span>
                                </div>

                                {/* 顶部标签 */}
                                <span
                                    className={`text-[9px] font-mono border px-1 rounded ${item.disabled ? 'border-white/10 text-white/30' : 'border-primary/30 text-primary'}`}>
                                    {item.sub}
                                </span>

                                {/* 底部文字 */}
                                <div className="z-10">
                                    <span
                                        className={`block font-display text-lg tracking-wide ${item.color === 'primary' ? 'text-primary' : 'text-white'}`}>
                                        {item.label}
                                    </span>
                                </div>

                                {/* 选中态角落光标 */}
                                {!item.disabled && (
                                    <>
                                        <div
                                            className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <div
                                            className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"/>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* --- Section 3: Reality Tuner (Innovative Interaction) --- */}
                <section
                    className={`mt-8 transition-all duration-700 delay-300 ${booted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="glass-card p-4 rounded-xl border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"/>

                        <div className="flex justify-between items-center mb-2">
                             <span className="text-xs font-bold text-white flex items-center gap-2">
                                <span className="font-icon text-sm animate-spin">settings</span>
                                REALITY_FILTER
                             </span>
                            <span className="font-mono text-primary text-xs">{noiseLevel}%</span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={noiseLevel}
                            onChange={(e) => setNoiseLevel(Number(e.target.value))}
                            className="cyber-range mt-2"
                        />

                        <div className="flex justify-between text-[8px] text-text-dim mt-2 font-mono uppercase">
                            <span>Safe Mode</span>
                            <span>Deep Dive</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- Footer Area --- */}
            <div className="fixed bottom-[70px] left-0 right-0 max-w-md mx-auto z-20">
                <BroadcastTicker messages={broadcastMessages}/>
            </div>

            <BottomNav
                activeKey="home"
                onNavigate={(key) => {
                    if (key === "atlas") navigate("/atlas");
                    if (key === "me") navigate("/me");
                    if (key === "sleep") navigate("/sleep"); // 假设
                }}
            />
        </div>
    );
}