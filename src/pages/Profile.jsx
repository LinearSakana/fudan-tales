import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BottomNav from "../components/ui/BottomNav.jsx";
import EngramList from "../components/EngramList";
import EngramModal from "../components/EngramModal";
import BilingualText from "../components/ui/BilingualText";
import {currentUser, engrams, syncLog} from "../data/user-data.js";
import LayoutEffects from "../components/layout/LayoutEffects";

export default function Profile() {
    const navigate = useNavigate();

    // --- State Management ---
    const [booted, setBooted] = useState(false);
    const [activeBar, setActiveBar] = useState(null);

    // 控制 Modal 的状态
    const [selectedEngram, setSelectedEngram] = useState(null);

    // --- Effects ---
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "神经档案 | ARCHIVE";
        // 模拟 CRT 开机延迟效果
        const timer = setTimeout(() => setBooted(true), 10);
        return () => clearTimeout(timer);
    }, []);

    // --- Helpers ---
    const getStatusColor = (status) => {
        switch (status) {
            case "OPTIMAL":
                return "bg-primary shadow-[0_0_10px_#ff0055]";
            case "STABLE":
                return "bg-teal-500";
            case "UNSTABLE":
                return "bg-orange-500";
            case "CRITICAL":
                return "bg-red-600 animate-pulse";
            default:
                return "bg-white/20";
        }
    };

    return (
        <div className="layout-page layout-frame font-mono text-white">

            {/* --- 全局模态框 (Portal/Overlay) --- */}
            {/* 当 selectedEngram 存在时，Modal 会渲染并覆盖在页面上方 */}
            <EngramModal
                engram={selectedEngram}
                onClose={() => setSelectedEngram(null)}
            />

            {/* --- 环境背景特效 --- */}
            <LayoutEffects noise="soft" scanlines/>

            {/* --- Header: ID CARD --- */}
            <header
                className={`relative z-10 p-5 pt-8 transition-all duration-300 ${booted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                <div className="glass-card rounded-xl p-5 border-l-4 border-l-primary overflow-hidden relative group">
                    {/* 装饰大字背景 */}
                    <div
                        className="absolute -top-4 -right-4 text-9xl opacity-10 font-black font-extra tracking-tighter pointer-events-none select-none">
                        {currentUser.id}
                    </div>

                    <div className="flex items-start gap-5 relative z-10">
                        {/* 头像框 */}
                        <div
                            className="w-20 h-24 bg-black border border-white/20 relative shrink-0 overflow-hidden stamp-box">
                            <img
                                src="https://api.dicebear.com/9.x/avataaars/svg?seed=123"
                                alt="Avatar"
                                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-scanlines opacity-30 mix-blend-overlay"/>
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-pulse"/>
                        </div>

                        {/* 个人信息 */}
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-display font-bold tracking-wider">{currentUser.name}</h1>
                                    <p className="text-[10px] text-primary font-bold tracking-[-0.02em]">{currentUser.alias}</p>
                                </div>
                                <span className="font-icon text-white/20 text-3xl">fingerprint</span>
                            </div>

                            <div className="pt-2 border-t border-dashed border-white/10 mt-2">
                                <p className="text-xxs text-text-dim">{currentUser.department}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="badge badge-muted">Lv.{currentUser.level}</span>
                                        <span className="badge badge-primary">CLASS-B</span>
                                    </div>
                                    <button onClick={() => navigate('/settings')}
                                            className="relative bottom-2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-primary hover:border-primary transition-all active:scale-90">
                                        <span className="font-icon text-lg">settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sanity Bar */}
                    <div className="mt-5 relative z-10">
                        <div className="flex justify-between text-xxs text-text-dim mb-1 font-bold">
                            <BilingualText cn="理智值" en="SANITY_STABILITY"/>
                            <span
                                className={currentUser.sanity < 50 ? "text-red-500" : "text-teal-400"}>{currentUser.sanity}%</span>
                        </div>
                        <div className="progress-track progress-track-md bg-black/50 border border-white/10">
                            <div
                                className="progress-bar progress-bar-glow bg-gradient-to-r from-primary-dark to-primary"
                                style={{width: `${currentUser.sanity}%`, transition: 'width 1s ease-out'}}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 overflow-y-auto px-5 pb-32 space-y-6 scroll-smooth">

                {/* --- Section 1: Dashboard Stats --- */}
                <section className={`transition-all duration-1000 delay-100 ${booted ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            {en: "NEURAL EFFICIENCY", cn: "神经效能", data: currentUser.stats.efficiency},
                            {en: "WAVE STABILITY", cn: "波形稳定性", data: currentUser.stats.stability},
                            {en: "SYNC LATENCY", cn: "延迟", data: currentUser.stats.latency},
                            {en: "REM COHERENCE", cn: "REM 一致度", data: currentUser.stats.coherence},
                        ].map((item, i) => (
                            <div key={i}
                                 className="glass-card relative p-3 rounded border border-white/5 flex flex-col justify-between overflow-hidden card-hover-glow group">
                                <div className="absolute inset-0 effect-scanlines-soft"/>
                                <div
                                    className="relative z-10 text-xxs text-text-dim font-bold tracking-wider flex flex-col leading-tight">
                                    <span>{item.cn}</span>
                                    <span className="scale-75 origin-top-left opacity-50">// {item.en}</span>
                                </div>
                                <div className="relative z-10 flex justify-between items-end mt-2">
                                    <span
                                        className={`text-lg font-mono font-bold ${item.data.status === 'warn' ? 'text-yellow-400' : 'text-white'}`}>
                                      {item.data.val}
                                    </span>
                                    <span
                                        className={`text-nano px-1 rounded ${item.data.status === 'opt' ? 'text-teal-400 bg-teal-400/10' : 'text-text-dim bg-white/5'}`}>
                                      {item.data.trend}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20"/>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Section 2: Calibration Chart --- */}
                <section className={`transition-all duration-1000 delay-200 ${booted ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-icon text-primary text-sm">ssid_chart</span>
                            <BilingualText cn="校准记录" en="CALIBRATION LOG" className="text-xs"/>
                        </div>
                        <span className="text-xxxs text-text-dim">TOTAL: {currentUser.totalSyncHours}h</span>
                    </div>

                    <div
                        className="glass-card relative p-4 rounded-xl border border-white/5 bg-black/40 overflow-hidden">
                        <div className="absolute inset-0 effect-scanlines-soft opacity-20"/>
                        <div className="relative z-10 flex justify-between items-end h-36 gap-2">
                            {syncLog.map((log, idx) => {
                                const heightPercent = Math.min((log.hours / 10) * 100, 100);
                                const isActive = activeBar === idx;
                                const barColor = isActive ? getStatusColor(log.status) : "bg-primary/30 hover:bg-primary/60";

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveBar(idx)}
                                        className="flex flex-col items-center gap-2 flex-1 group h-full justify-end cursor-pointer"
                                    >
                                        <div
                                            className={`absolute -top-2 text-[9px] font-bold transition-opacity duration-300 ${isActive ? 'opacity-100 text-white' : 'opacity-0 text-text-dim'}`}>
                                            {log.hours}h
                                        </div>
                                        <div
                                            className="w-full h-full flex items-end relative rounded-sm bg-white/5 overflow-hidden">
                                            <div
                                                className={`w-full rounded-sm transition-all duration-500 ${barColor} ${booted ? 'bar-grow' : ''}`}
                                                style={{height: `${heightPercent}%`, animationDelay: `${idx * 50}ms`}}
                                            />
                                        </div>
                                        <span
                                            className={`text-[9px] font-mono transition-colors ${isActive ? 'text-primary font-bold' : 'text-text-dim'}`}>
                                            {log.day.charAt(0)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        {/* 选中时的详情文本 */}
                        <div
                            className="mt-3 pt-2 border-t border-white/10 flex justify-between text-xxxs min-h-[20px]">
                            {activeBar !== null ? (
                                <>
                                    <span className="text-white">STATUS: {syncLog[activeBar].status}</span>
                                    <span
                                        className="text-text-dim">SYNC_QUALITY: {Math.floor(syncLog[activeBar].hours * 12)}%</span>
                                </>
                            ) : (
                                <span className="text-text-dim w-full text-center tracking-widest animate-pulse">Select a time fragment...</span>
                            )}
                        </div>
                    </div>
                </section>

                {/* --- Section 3: Engrams (Refactored) --- */}
                <section className={`transition-all duration-500 delay-300 ${booted ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                        <span className="font-icon text-primary text-sm">extension</span>
                        <BilingualText cn="记忆印痕" en="MEMORY ENGRAMS" className="text-xs"/>
                    </div>

                    {/* 使用拆分后的组件，并传入点击事件处理 */}
                    <EngramList
                        engrams={engrams}
                        onSelect={(engram) => setSelectedEngram(engram)}
                    />
                </section>

                <div className="h-4"/>
            </main>

            <BottomNav
                activeKey="me"
                onNavigate={(key) => {
                    if (key === "atlas") navigate("/atlas");
                    if (key === "me") navigate("/me");
                    if (key === "sleep") navigate("/sleep");
                    // 实际项目中应添加其他路由
                }}
            />
        </div>
    );
}
