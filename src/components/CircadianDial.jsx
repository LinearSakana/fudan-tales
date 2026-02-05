import React from 'react';

const CircadianDial = ({stability}) => {
    // 简单的视觉组件，由三个旋转的SVG圆环组成
    return (
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-6 group cursor-default">
            {/* 外部刻度环 (慢速旋转) */}
            <div
                className="absolute inset-0 border border-dashed border-white/20 rounded-full animate-spin-slow opacity-50"/>

            {/* 内部装饰环 (反向旋转) */}
            <div
                className="absolute inset-4 border border-white/5 rounded-full border-t-primary/50 animate-spin-slow [animation-direction:reverse] duration-[8s]"/>

            {/* 核心显示区 */}
            <div
                className="relative z-10 text-center flex flex-col items-center justify-center bg-black/40 backdrop-blur-md w-32 h-32 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,0,85,0.1)] group-hover:shadow-[0_0_50px_rgba(255,0,85,0.3)] transition-all">
                <span className="text-[10px] text-text-dim tracking-widest mb-1">STABILITY</span>
                <span className="text-3xl font-display font-bold text-white text-glow">
                    {stability}%
                </span>
                <div className="mt-1 flex gap-1">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce"/>
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce delay-75"/>
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce delay-150"/>
                </div>
            </div>

            {/* 扫描线特效 */}
            <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden opacity-30">
                <div className="w-full h-[2px] bg-primary/50 absolute top-0 animate-[scan_3s_linear_infinite]"/>
            </div>
        </div>
    );
};

export default CircadianDial;