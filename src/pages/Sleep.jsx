import React, { useState, useMemo } from "react";
import BottomNav from "../components/ui/BottomNav";
import LayoutEffects from "../components/layout/LayoutEffects";
import { Button } from "../components/ui/Button";
import { Slider } from "../components/ui/Slider";
import Header from "../components/ui/Header";

export default function Sleep() {
    const [isSleeping, setIsSleeping] = useState(false);
    const [duration, setDuration] = useState([8]); // Default 8 hours

    // Calculate wake time
    // Updates when duration changes. Captures "now" at the moment of interaction.
    const wakeTime = useMemo(() => {
        const now = new Date();
        const target = new Date(now.getTime() + duration[0] * 60 * 60 * 1000);
        return target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, [duration]);

    // Handle sleep toggle
    const handleSleepToggle = () => {
        setIsSleeping(!isSleeping);
    };

    // Quick presets
    const presets = [
        { label: "NAP", val: 0.5 },
        { label: "CYCLE", val: 1.5 },
        { label: "REST", val: 8 },
    ];

    return (
        <div className="layout-page layout-frame font-display text-white relative min-h-screen flex flex-col bg-background-dark overflow-hidden">
            <LayoutEffects
                noise={isSleeping ? "soft" : "strong"}
                scanlines={true}
                vignette={true}
                grid={!isSleeping}
            />

            {/* Breathing Background Overlay for Sleep Mode */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-[2000ms] ${isSleeping ? "opacity-80" : "opacity-0 pointer-events-none"}`}
                style={{ zIndex: 5 }}
            />

            {/* Header */}
            <div className={`transition-all duration-500 relative z-20 ${isSleeping ? "opacity-30 blur-sm" : "opacity-100"}`}>
                <Header
                    title="睡眠终端"
                    subtitle="HIBERNATION_MOD"
                    icon="bedtime"
                    iconText="返回"
                    rightText={isSleeping ? "SLEEPING..." : "STANDBY"}
                />
            </div>

            <main className="relative z-20 flex-1 flex flex-col justify-center items-center px-6 pb-24 w-full max-w-md mx-auto">

                {/* Main Visual Circle */}
                <div className="relative mb-10 group">
                    {/* Outer Rotating Ring */}
                    <div className={`absolute inset-[-20px] border border-dashed border-white/10 rounded-full w-[280px] h-[280px] animate-spin-slow duration-[30s] transition-opacity ${isSleeping ? "opacity-10" : "opacity-30"}`} />

                    {/* Inner Pulse Ring (Active in Sleep) */}
                    {isSleeping && (
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-slow scale-150" />
                    )}

                    {/* Main Circle Container */}
                    <div
                        className={`relative w-60 h-60 rounded-full flex flex-col items-center justify-center border-2 bg-black/40 backdrop-blur-md transition-all duration-700
                        ${isSleeping
                                ? "border-primary/50 shadow-[0_0_50px_rgba(255,0,85,0.3)] scale-110"
                                : "border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                            }`}
                    >
                        {/* Progress SVG Ring */}
                        <svg className="absolute inset-0 transform -rotate-90 w-full h-full p-2" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <circle
                                cx="50" cy="50" r="45" fill="none"
                                stroke={isSleeping ? "#ff0055" : "#00FFFF"}
                                strokeWidth="2"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * (duration[0] / 12))} // Max 12h for ring visual
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-in-out"
                            />
                        </svg>

                        {/* Text Content */}
                        <div className="text-center z-10 space-y-1">
                            <span className={`block text-xxs tracking-[0.2em] mb-2 ${isSleeping ? "text-primary animate-pulse" : "text-text-dim"}`}>
                                {isSleeping ? "WAKE UP TIME" : "TARGET TIME"}
                            </span>
                            <h1 className={`text-5xl font-bold font-mono tracking-tighter transition-all ${isSleeping ? "text-primary text-glow" : "text-white"}`}>
                                {wakeTime}
                            </h1>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${isSleeping ? "bg-primary/20 text-primary" : "bg-white/10 text-text-dim"}`}>
                                    +{duration[0]}h
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls Area (Fades out when sleeping) */}
                <div className={`w-full space-y-8 transition-all duration-700 ease-out ${isSleeping ? "opacity-0 translate-y-10 pointer-events-none delay-0" : "opacity-100 translate-y-0 delay-100"}`}>

                    {/* Slider Control */}
                    <div className="space-y-4 px-4">
                        <div className="flex justify-between items-center text-xs font-mono text-text-dim">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                                SLEEP DURATION
                            </span>
                            <span>{duration[0]} HOURS</span>
                        </div>
                        <Slider
                            value={duration}
                            onValueChange={setDuration}
                            max={12}
                            min={0.5}
                            step={0.5}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xxxs text-white/30 font-mono px-1">
                            <span>0.5h</span>
                            <span>|</span>
                            <span>6h</span>
                            <span>|</span>
                            <span>12h</span>
                        </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="grid grid-cols-3 gap-3 px-2">
                        {presets.map((p) => (
                            <button
                                key={p.label}
                                onClick={() => setDuration([p.val])}
                                className={`py-2 px-1 rounded border transition-all text-xs font-bold tracking-wider hover:bg-white/5 active:scale-95
                                ${duration[0] === p.val
                                        ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                                        : "border-white/10 text-text-dim"
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Action Button (Always visible but changes style) */}
                <div className="absolute bottom-24 w-full px-6">
                    <Button
                        className={`w-full h-14 text-lg font-bold tracking-widest shadow-lg transition-all duration-500 overflow-hidden group relative
                        ${isSleeping
                                ? "bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                                : "bg-primary hover:bg-primary-dark text-white border-none"
                            }`}
                        onClick={handleSleepToggle}
                    >
                        {isSleeping && <div className="absolute inset-0 bg-scanlines opacity-10" />}
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <span className={`font-icon text-xl ${isSleeping ? "animate-spin-slow" : ""}`}>
                                {isSleeping ? "settings_backup_restore" : "bedtime"}
                            </span>
                            {isSleeping ? "WAKE UP" : "INITIATE SLEEP"}
                        </span>
                    </Button>

                    {/* Status Text */}
                    <p className={`text-center text-xxxs mt-4 font-mono transition-all duration-500 ${isSleeping ? "text-primary/70 animate-pulse" : "text-text-dim"}`}>
                        {isSleeping ? "/// NEURAL LINK ACTIVE - MONITORING ///" : "READY TO SYNCHRONIZE"}
                    </p>
                </div>

            </main>

            <BottomNav activeKey="sleep" />
        </div>
    );
}
