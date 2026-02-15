import React, {useState, useEffect, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import LayoutEffects from "../components/layout/LayoutEffects";
import {Button} from "../components/ui/Button";
import {getRandomRewardCard} from "../data/sleep-rewards";

/**
 * 档案解密 / 异闻收集页面
 * 唤醒后（睡眠 ≥ 30min）跳转至此，通过三阶段动画展示新收集的异闻卡
 *
 * 阶段1: 解密动画 (decrypting) — 扫描线 + 进度 + glitch
 * 阶段2: 卡片揭示 (revealed)  — 3D 翻转 + 缩放弹出
 * 阶段3: 交互 (interactive)   — 显示描述 + 操作按钮
 */
export default function SleepReward() {
    const navigate = useNavigate();

    // 随机抽取一张奖励卡
    const card = useMemo(() => getRandomRewardCard(), []);

    // 动画阶段
    const [phase, setPhase] = useState("decrypting"); // decrypting → revealed → interactive
    const [progress, setProgress] = useState(0);
    const [glitchText, setGlitchText] = useState("INITIALIZING...");

    // 解密进度动画
    useEffect(() => {
        if (phase !== "decrypting") return;

        const glitchMessages = [
            "SCANNING NEURAL ARCHIVE...",
            "DECRYPTING SIGNAL...",
            "PARSING ANOMALY DATA...",
            "VERIFYING INTEGRITY...",
            "RECONSTRUCTING FILE...",
            "ANOMALY DETECTED !!!",
        ];

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + randInt(2, 6);
                // 更新 glitch 文字
                const msgIdx = Math.min(
                    Math.floor((next / 100) * glitchMessages.length),
                    glitchMessages.length - 1
                );
                setGlitchText(glitchMessages[msgIdx]);

                if (next >= 100) {
                    clearInterval(interval);
                    // 延迟进入揭示阶段
                    setTimeout(() => setPhase("revealed"), 400);
                    return 100;
                }
                return next;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [phase]);

    // 揭示后延迟进入交互阶段
    useEffect(() => {
        if (phase !== "revealed") return;
        const timer = setTimeout(() => setPhase("interactive"), 1200);
        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <div
            className="layout-page layout-frame font-mono text-white relative min-h-screen flex flex-col bg-background-dark overflow-hidden">
            <LayoutEffects
                noise={phase === "decrypting" ? "strong" : "soft"}
                scanlines={true}
                vignette={true}
            />

            {/* ========== 阶段1：解密动画 ========== */}
            {phase === "decrypting" && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90">
                    {/* 扫描线效果 */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="decrypt-scan-line"/>
                    </div>

                    {/* 中心内容 */}
                    <div className="relative z-10 text-center space-y-6">
                        {/* 旋转图标 */}
                        <div className="flex justify-center">
                            <span
                                className="font-icon text-5xl text-primary animate-spin-slow drop-shadow-[0_0_20px_#ff0055]">
                                lock_open
                            </span>
                        </div>

                        {/* 进度数字 */}
                        <div>
                            <span className="text-6xl font-bold text-primary tabular-nums tracking-tighter text-glow">
                                {progress}%
                            </span>
                        </div>

                        {/* Glitch 文字 */}
                        <p className="text-xs text-accent-cyan tracking-[0.3em] glitch-text" data-text={glitchText}>
                            {glitchText}
                        </p>

                        {/* 进度条 */}
                        <div className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-100 shadow-[0_0_10px_#ff0055]"
                                style={{width: `${progress}%`}}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ========== 阶段2+3：卡片揭示与交互 ========== */}
            {(phase === "revealed" || phase === "interactive") && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6">
                    {/* 背景光晕 */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse"/>
                    </div>

                    {/* 标题 */}
                    <div
                        className={`text-center mb-6 transition-all duration-700 ${phase === "interactive" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                        <p className="text-xxs text-accent-cyan tracking-[0.4em] mb-1">NEW ANOMALY DETECTED</p>
                        <h2 className="text-xl font-bold text-white text-glow">发现新异闻</h2>
                    </div>

                    {/* 卡片 - 翻转动画 */}
                    <div
                        className={`relative w-56 transition-all duration-1000 ease-out ${phase === "interactive"
                            ? "scale-100 opacity-100"
                            : "scale-75 opacity-0"
                        }`}
                        style={{perspective: "1000px"}}
                    >
                        <div className={`card-flip-inner ${phase === "interactive" ? "card-flipped" : ""}`}>
                            {/* 卡片背面（加密态） */}
                            <div className="card-flip-face card-flip-back">
                                <div
                                    className="aspect-[3/4] rounded-lg bg-surface-dark border-2 border-primary/30 flex flex-col items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-scanlines opacity-20"/>
                                    <span className="font-icon text-6xl text-primary/40">lock</span>
                                    <p className="text-xxs text-primary/60 mt-2 tracking-widest">ENCRYPTED</p>
                                </div>
                            </div>

                            {/* 卡片正面（解密后） */}
                            <div className="card-flip-face card-flip-front">
                                <div
                                    className="aspect-[3/4] rounded-lg overflow-hidden relative border-2 border-primary/50 shadow-[0_0_30px_rgba(255,0,85,0.3)]">
                                    {/* 封面图 */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{backgroundImage: `url("${card.coverUrl}")`}}
                                    />
                                    {/* 渐变遮罩 */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"/>

                                    {/* 卡片信息 */}
                                    <div className="absolute bottom-0 left-0 w-full p-4">
                                        <p className="text-xxs text-primary font-mono tracking-wider mb-1">{card.code}</p>
                                        <h3 className="text-lg font-bold text-white leading-tight">{card.title}</h3>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <span className="font-icon text-accent-cyan text-xs">location_on</span>
                                            <span className="text-xxxs text-accent-cyan">{card.zone}</span>
                                        </div>
                                    </div>

                                    {/* 全息扫描效果 */}
                                    <div className="absolute inset-0 holo-scan pointer-events-none"/>

                                    {/* NEW 徽章 */}
                                    <div className="absolute top-3 right-3 bg-primary px-2 py-0.5 rounded-sm">
                                        <span className="text-xxxs font-bold text-white tracking-wider">NEW</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 描述文字 */}
                    <div
                        className={`mt-6 max-w-sm text-center transition-all duration-700 delay-300 ${phase === "interactive" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <p className="text-xs text-white/70 leading-relaxed">{card.description}</p>
                    </div>

                    {/* 操作按钮 */}
                    <div
                        className={`mt-8 w-full max-w-xs space-y-3 transition-all duration-700 delay-500 ${phase === "interactive" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        <Button
                            className="w-full h-12 text-sm font-bold tracking-widest bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30"
                            onClick={() => navigate(`/atlas/${card.code}`)}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="font-icon text-base">visibility</span>
                                查看详情
                            </span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full h-10 text-xs font-bold tracking-widest text-text-dim hover:text-white border border-white/10 hover:border-white/20"
                            onClick={() => navigate("/sleep", {state: {returnToSleep: true}})}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="font-icon text-sm">arrow_back</span>
                                返回睡眠终端
                            </span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

/** 工具函数：[min, max] 随机整数 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
