import React, {useState, useEffect, useMemo, useRef} from 'react';
import LayoutEffects from "../components/layout/LayoutEffects";
import Header from "../components/ui/Header";
import BottomNav from "../components/ui/BottomNav";
import HoldToTriggerButton from "../components/ui/HoldToTriggerButton";
import {Button} from "../components/ui/Button";
import BilingualText from "../components/ui/BilingualText";
import {Slider} from "../components/ui/Slider";

export default function Focus() {
    const [isFocusing, setIsFocusing] = useState(false);
    const [durationMinutes, setDurationMinutes] = useState([25]); // Default 25 min
    const [timeLeft, setTimeLeft] = useState(25 * 60);

    // Timer Logic
    useEffect(() => {
        let interval;
        if (isFocusing && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isFocusing) {
            // Completed
            setIsFocusing(false);
            // TODO: Play sound / vibro
        }
        return () => clearInterval(interval);
    }, [isFocusing, timeLeft]);

    // Reset timer when duration changes (if not focusing)
    useEffect(() => {
        if (!isFocusing) {
            setTimeLeft(durationMinutes[0] * 60);
        }
    }, [durationMinutes, isFocusing]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleStartFocus = () => {
        setIsFocusing(true);
    };

    const handleStopFocus = () => {
        setIsFocusing(false);
        setTimeLeft(durationMinutes[0] * 60);
    };

    const presets = [
        {label: "SHORT", val: 10},
        {label: "POMODORO", val: 25},
        {label: "DEEP", val: 60},
    ];

    return (
        <div
            className="layout-page layout-frame font-display text-white relative min-h-screen flex flex-col bg-background-dark overflow-hidden transition-colors duration-1000">
            {/* Background Effects */}
            <LayoutEffects
                noise={isFocusing ? "soft" : "strong"}
                scanlines={true}
                vignette={true}
                grid={!isFocusing}
            />

            {/* Focus Mode Red Overlay */}
            <div
                className={`absolute inset-0 bg-red-900/10 pointer-events-none transition-opacity duration-1000 ${isFocusing ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Header */}
            <div
                className={`transition-all duration-500 relative z-20 ${isFocusing ? "opacity-30 blur-sm" : "opacity-100"}`}>
                <Header
                    title="专注终端"
                    subtitle="FOCUS_LINK"
                    icon="timer"
                    iconText="返回"
                    rightText={isFocusing ? "LINKED" : "IDLE"}
                />
            </div>

            <main
                className="relative z-20 flex-1 flex flex-col justify-center items-center px-6 pb-24 w-full max-w-md mx-auto">

                {/* Timer Display */}
                <div className="relative mb-12 group">
                    {/* Outer Ring */}
                    <div
                        className={`absolute inset-[-30px] border border-dashed border-white/10 rounded-full w-[300px] h-[300px] transition-all duration-[1s] ${isFocusing ? "animate-spin-slow opacity-20 border-primary/30" : "opacity-10"}`}/>

                    {/* Progress Circle (Canvas/SVG) */}
                    <svg className="w-60 h-60 transform -rotate-90 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                         viewBox="0 0 100 100">
                        {/* Bg Circle */}
                        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                        {/* Progress Circle */}
                        <circle
                            cx="50" cy="50" r="46" fill="none"
                            stroke={isFocusing ? "#ff0055" : "#00FFFF"}
                            strokeWidth={isFocusing ? "2" : "1"}
                            strokeDasharray="289"
                            strokeDashoffset={289 - (289 * (timeLeft / (durationMinutes[0] * 60)))}
                            className="transition-all duration-1000 ease-linear"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Time Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span
                            className={`text-xxxs tracking-widest mb-2 ${isFocusing ? "text-primary animate-pulse" : "text-text-dim"}`}>
                            {isFocusing ? "REMAINING" : "DURATION"}
                        </span>
                        <span
                            className={`text-6xl font-bold font-mono tracking-tighter ${isFocusing ? "text-primary text-glow" : "text-white"}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>

                {/* Controls (Hidden when focusing) */}
                <div
                    className={`w-full space-y-8 transition-all duration-500 ${isFocusing ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}`}>
                    <div className="space-y-4 px-4">
                        <Slider
                            value={durationMinutes}
                            onValueChange={setDurationMinutes}
                            max={120}
                            min={5}
                            step={5}
                            className="w-full"
                        />
                        <div className="grid grid-cols-3 gap-3">
                            {presets.map((p) => (
                                <button
                                    key={p.label}
                                    onClick={() => setDurationMinutes([p.val])}
                                    className={`py-2 px-1 rounded border transition-all text-xs font-bold tracking-wider hover:bg-white/5 active:scale-95
                                    ${durationMinutes[0] === p.val
                                        ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                                        : "border-white/10 text-text-dim"
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="absolute bottom-24 w-full px-6">
                    {!isFocusing ? (
                        <HoldToTriggerButton
                            onTrigger={handleStartFocus}
                            holdDuration={1500}
                            className="w-full h-16 bg-primary/20 border border-primary/50 text-white font-bold tracking-widest hover:bg-primary/30 active:bg-primary/40 rounded shadow-[0_0_20px_rgba(255,0,85,0.2)] transition-all"
                        >
                            <span className="font-icon">fingerprint</span>
                            HOLD TO START
                        </HoldToTriggerButton>
                    ) : (
                        <HoldToTriggerButton
                            onTrigger={handleStopFocus}
                            holdDuration={2000}
                            className="w-full h-16 bg-black/50 border border-white/10 text-text-dim hover:text-white hover:border-white/30 rounded backdrop-blur-md transition-all"
                        >
                            <span className="font-icon">block</span>
                            HOLD TO ABORT
                        </HoldToTriggerButton>
                    )}

                    <p className="text-center text-xxxs mt-4 text-text-dim opacity-50 font-mono">
                        {isFocusing ? "FOCUS LINK ESTABLISHED" : "LONG PRESS TO ESTABLISH LINK"}
                    </p>
                </div>
            </main>

            <BottomNav activeKey="focus"/>
        </div>
    );
}
