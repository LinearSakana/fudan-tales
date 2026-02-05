import BottomNav from "../components/ui/BottomNav.jsx";
import {useEffect} from "react";
import LayoutEffects from "../components/layout/LayoutEffects";

export default function SleepMonitor() {
    // 页面初始化：设置标题，保持原始风格的页面标题
    useEffect(() => {
        document.title = "睡眠校准监控 中文版";
    }, []);

    return (
        <div
            className="layout-page layout-frame-light shadow-2xl border-x border-gray-800 overflow-hidden bg-background-dark text-white">
            <LayoutEffects noise="soft" scanlines grid vignette/>
            <div className="relative z-10 flex flex-col flex-1">
                <div className="relative flex h-full min-h-screen w-full flex-col bg-black overflow-hidden">

                    {/* 顶部导航栏（统一 TopBar） */}
                    <div className="relative z-20 header-bar px-6 pt-12 pb-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-terminal-green animate-pulse"
                                  style={{fontSize: '20px'}}>terminal</span>
                            <div className="flex flex-col">
                                <span className="header-subtitle mb-1">系统</span>
                                <h2 className="text-sm font-bold tracking-wider text-white">校准模式</h2>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="header-subtitle mb-1">实验对象</span>
                            <p className="text-primary text-sm font-bold tracking-widest font-mono">2024-X</p>
                        </div>
                    </div>

                    {/* 进程日志区域（原始样式） */}
                    <div className="relative z-20 flex flex-col items-center justify-center pt-8 px-6">
                        <div
                            className="w-full max-w-md border border-white/10 bg-white/5 rounded-sm p-4 backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
                            <p className="text-terminal-green text-xxs font-mono tracking-widest mb-2 opacity-70">
                                &gt;&gt; 进程日志启动
                            </p>
                            <h1 className="text-white text-xl md:text-2xl font-bold leading-tight tracking-tight uppercase glitch-text mb-2">
                                正在检测思维褶皱...
                            </h1>
                            <p className="text-gray-400 text-sm font-mono">
                                正在重调意识流。现实锚点保持在 98%。
                            </p>
                        </div>
                    </div>

                    {/* 脑波示波器区域（原始样式） */}
                    <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4 py-8">
                        <div className="w-full max-w-lg relative">
                            <div className="flex justify-between items-end mb-2 px-2">
                                <p className="text-white/60 text-xxs tracking-[0.2em] uppercase">脑波示波器</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></span>
                                    <p className="text-terminal-green text-xs font-bold tracking-wider">稳定快速眼动期</p>
                                </div>
                            </div>
                            <div className="relative w-full h-64 border-x border-white/10 bg-black/50">
                                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none">
                                    <div className="border-r border-b border-white/5 border-dashed"></div>
                                    <div className="border-r border-b border-white/5 border-dashed"></div>
                                    <div className="border-r border-b border-white/5 border-dashed"></div>
                                    <div className="border-r border-b border-white/5 border-dashed"></div>
                                    <div className="border-r border-b border-white/5 border-dashed"></div>
                                    <div className="border-r border-b border-white/5 border-dashed"></div>
                                    <div className="border-r border-white/5 border-dashed col-span-6 row-span-3"></div>
                                </div>
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none"
                                     viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                                            <feGaussianBlur result="blur" stdDeviation="2"></feGaussianBlur>
                                            <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                                        </filter>
                                        <linearGradient id="fadeGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#00ff41" stopOpacity="0.1"></stop>
                                            <stop offset="100%" stopColor="#00ff41" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0 75 Q 20 75, 40 50 T 80 75 T 120 100 T 160 75 T 200 40 T 240 75 T 280 110 T 320 75 T 360 40 T 400 75"
                                        fill="none" stroke="#ff0055" strokeOpacity="0.3" strokeWidth="1"
                                        transform="translate(4, 0)"></path>
                                    <path
                                        d="M0 75 Q 20 75, 40 50 T 80 75 T 120 100 T 160 75 T 200 40 T 240 75 T 280 110 T 320 75 T 360 40 T 400 75"
                                        fill="url(#fadeGradient)" filter="url(#glow)" stroke="#00ff41"
                                        strokeWidth="2"></path>
                                </svg>
                                <div className="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
                            </div>
                            <div
                                className="flex justify-between items-start mt-2 px-2 font-mono text-xxs text-gray-500">
                                <span>-00:05:00</span>
                                <span className="text-primary font-bold">异常风险：低</span>
                                <span>现在</span>
                            </div>
                        </div>
                    </div>

                    {/* 数据统计区域（原始样式） */}
                    <div className="relative z-20 w-full px-6 pb-6">
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                            <div
                                className="bg-white/5 border border-white/10 p-3 rounded-sm flex flex-col items-center justify-center">
                                <span className="text-xxs uppercase text-gray-400 tracking-wider mb-1">环境噪音</span>
                                <p className="text-white font-mono font-bold text-lg">-40dB</p>
                            </div>
                            <div
                                className="bg-white/5 border border-white/10 p-3 rounded-sm flex flex-col items-center justify-center">
                                <span className="text-xxs uppercase text-gray-400 tracking-wider mb-1">主观时长</span>
                                <p className="text-white font-mono font-bold text-lg">04:20:00</p>
                            </div>
                        </div>
                    </div>

                    {/* 滑动唤醒区域（原始样式，保留核心交互） */}
                    <div className="relative z-20 w-full px-6 pb-24"> {/* 增加 pb-24 避免被底部导航遮挡 */}
                        <div className="max-w-md mx-auto">
                            <div className="relative flex flex-col items-center gap-4">
                                <div
                                    className="relative w-full h-14 bg-[#1a0b10] rounded-lg border border-primary/30 overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(255,0,85,0.1)]">
                                    <div
                                        className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,0,85,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-primary/80 font-bold tracking-[0.2em] text-sm animate-pulse">&gt;&gt;&gt; 滑动以启动唤醒协议</p>
                                    </div>
                                    <div
                                        className="absolute left-1 top-1 bottom-1 w-12 bg-primary rounded-md flex items-center justify-center shadow-[0_0_10px_rgba(255,0,85,0.5)] z-10">
                                        <span className="material-symbols-outlined text-white"
                                              style={{fontSize: '20px'}}>chevron_right</span>
                                    </div>
                                    <input aria-label="Slide to wake"
                                           className="absolute inset-0 opacity-0 w-full h-full cursor-col-resize z-20"
                                           max="100" min="0" type="range" value="0"/>
                                </div>
                                <p className="text-xxs text-gray-600 uppercase tracking-widest">紧急终止程序</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-6"></div>
                </div>
            </div>
            <BottomNav activeKey="sleep"/>
            <div
                className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"/>
        </div>
    );
}