import React from 'react';

// props.progress: 0-100 (每日同步进度)
const CircadianDial = ({progress = 0, onSync = null}) => {
    return (
        <div className="relative w-56 h-56 mx-auto flex items-center justify-center my-4 group select-none">
            {/* 1. 外部刻度环 (慢速旋转) */}
            <div
                className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-spin-slow opacity-30"/>

            {/* 2. 进度环 (根据任务完成度显示) */}
            <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0, 0, 100, 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2"/>
                <circle
                    cx="50" cy="50" r="46" fill="none"
                    stroke="#ff0055" strokeWidth="2"
                    strokeDasharray="289" // 2 * PI * r(approx 46%)
                    strokeDashoffset={289 - (289 * progress) / 100}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                />
            </svg>

            {/* 3. 内部动态装饰 */}
            <div
                className="absolute inset-8 border border-white/5 rounded-full border-t-teal-400/30 animate-spin-slow [animation-direction:reverse] duration-[15s]"/>

            {/* 4. 核心交互区 (点击进行同步) */}
            <div
                onClick={onSync}
                className="relative z-10 text-center flex flex-col items-center justify-center bg-background-dark/80 backdrop-blur-xl w-32 h-32 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,0,85,0.05)] group-hover:shadow-[0_0_50px_rgba(255,0,85,0.2)] transition-all cursor-pointer active:scale-95 overflow-hidden">
                {/* 扫描线 */}
                <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"/>

                <span className="text-xxxs text-text-dim tracking-widest mb-1">SYNC STATUS</span>
                <span className="text-3xl font-display font-bold text-white text-glow">
                    {Number(progress).toFixed(1)}%
                </span>

                {/* 状态指示灯 */}
                <div
                    className="mt-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                    <div
                        className={`w-1.5 h-1.5 rounded-full ${progress >= 100 ? 'bg-teal-400' : 'bg-primary animate-pulse'}`}/>
                    <span className="text-nano font-mono text-white/70">
                        {progress >= 100 ? 'STABLE' : 'REQUIRED'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CircadianDial;