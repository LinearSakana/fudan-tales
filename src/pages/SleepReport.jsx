import React, {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import LayoutEffects from "../components/layout/LayoutEffects";
import {Button} from "../components/ui/Button";
import {Card} from "../components/ui/Card";
import {generateSleepReport} from "../data/sleep-rewards";
import BilingualText from "../components/ui/BilingualText";

/**
 * 睡眠统计报告页面
 * 在用户点击 INITIATE SLEEP 后跳转至此，展示昨晚睡眠数据分析
 */
export default function SleepReport() {
    const navigate = useNavigate();

    // 生成随机的睡眠报告数据（仅在页面首次渲染时）
    const report = useMemo(() => generateSleepReport(), []);

    // 根据评分决定主色调
    const scoreColor = report.score >= 80 ? "text-terminal-green"
        : report.score >= 60 ? "text-amber-400" : "text-red-400";

    // 进入睡眠模式：记录开始时间并跳转
    const handleEnterSleep = () => {
        sessionStorage.setItem("sleepStartTime", Date.now().toString());
        navigate("/sleep", {state: {enterSleep: true}});
    };

    return (
        <div
            className="layout-page layout-frame font-mono text-white relative min-h-screen flex flex-col bg-background-dark overflow-hidden">
            <LayoutEffects noise="soft" scanlines={true} vignette={true}/>

            {/* 顶部导航栏 */}
            <header className="relative z-20 p-4 flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/sleep")}
                    className="-ml-2 text-text-dim hover:text-white"
                >
                    <span className="font-icon">arrow_back</span>
                </Button>
                <div>
                    <BilingualText cn="睡眠数据报告" en="SLEEP_ANALYTICS_REPORT" className="text-lg font-bold"/>
                </div>
                <div className="ml-auto">
                    <span className="text-xxxs text-primary animate-pulse font-mono">● LIVE</span>
                </div>
            </header>

            <main className="relative z-20 flex-1 px-5 pb-28 overflow-y-auto space-y-5">

                {/* ── 评分环 ── */}
                <div className="flex flex-col items-center py-4">
                    <div className="relative w-40 h-40">
                        {/* 背景环 */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"/>
                            <circle
                                cx="50" cy="50" r="42" fill="none"
                                stroke={report.score >= 80 ? "#00ff88" : report.score >= 60 ? "#fbbf24" : "#ff4444"}
                                strokeWidth="6"
                                strokeDasharray={2 * Math.PI * 42}
                                strokeDashoffset={2 * Math.PI * 42 * (1 - report.score / 100)}
                                strokeLinecap="round"
                                className="transition-all duration-1000 drop-shadow-[0_0_8px_currentColor]"
                            />
                        </svg>
                        {/* 中心评分 */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-bold ${scoreColor}`}>{report.score}</span>
                            <span className="text-xxs text-text-dim mt-0.5">GRADE</span>
                            <span className={`text-lg font-bold ${scoreColor}`}>{report.grade}</span>
                        </div>
                    </div>
                    <p className="text-xxs text-text-dim mt-3 tracking-widest">LAST NIGHT ANALYSIS</p>
                </div>

                {/* ── 睡眠阶段分布条 ── */}
                <Card className="p-4 bg-white/5 border-white/10">
                    <h3 className="text-xs font-bold text-text-dim mb-3 tracking-wider">
                        睡眠阶段分布 <span className="text-white/30">/ SLEEP STAGES</span>
                    </h3>
                    {/* 堆叠进度条 */}
                    <div className="h-6 w-full rounded-sm overflow-hidden flex">
                        <div className="h-full bg-purple-600 transition-all" style={{width: `${report.deepPct}%`}}
                             title={`深睡 ${report.deepPct}%`}/>
                        <div className="h-full bg-blue-500 transition-all" style={{width: `${report.lightPct}%`}}
                             title={`浅睡 ${report.lightPct}%`}/>
                        <div className="h-full bg-primary transition-all" style={{width: `${report.remPct}%`}}
                             title={`REM ${report.remPct}%`}/>
                        <div className="h-full bg-white/20 transition-all" style={{width: `${report.awakePct}%`}}
                             title={`清醒 ${report.awakePct}%`}/>
                    </div>
                    {/* 图例 */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                        {[
                            {label: "深睡", color: "bg-purple-600", pct: report.deepPct},
                            {label: "浅睡", color: "bg-blue-500", pct: report.lightPct},
                            {label: "REM", color: "bg-primary", pct: report.remPct},
                            {label: "清醒", color: "bg-white/20", pct: report.awakePct},
                        ].map((s) => (
                            <div key={s.label} className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${s.color}`}/>
                                <span className="text-xxxs text-text-dim">{s.label}</span>
                                <span className="text-xxxs text-white font-bold">{s.pct}%</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ── 核心指标卡片网格 ── */}
                <div className="grid grid-cols-2 gap-3">
                    {[
                        {icon: "schedule", label: "睡眠时长", value: report.duration, sub: "DURATION"},
                        {icon: "hourglass_top", label: "入睡延迟", value: `${report.latency}min`, sub: "LATENCY"},
                        {icon: "favorite", label: "平均心率", value: `${report.heartRate} BPM`, sub: "HEART RATE"},
                        {icon: "air", label: "呼吸频率", value: `${report.breathRate}/min`, sub: "RESP. RATE"},
                    ].map((item) => (
                        <Card key={item.sub} className="p-3 bg-white/5 border-white/10 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                                <span className="font-icon text-primary text-sm">{item.icon}</span>
                                <span className="text-xxxs text-text-dim">{item.label}</span>
                            </div>
                            <span className="text-lg font-bold tracking-tight">{item.value}</span>
                            <span className="text-xxxs text-white/30 tracking-widest">{item.sub}</span>
                        </Card>
                    ))}
                </div>

                {/* ── 睡眠质量曲线（简化 CSS 柱状图） ── */}
                <Card className="p-4 bg-white/5 border-white/10">
                    <h3 className="text-xs font-bold text-text-dim mb-3 tracking-wider">
                        睡眠深度曲线 <span className="text-white/30">/ DEPTH CURVE</span>
                    </h3>
                    <div className="h-24 flex items-end justify-between gap-1.5">
                        {report.qualityCurve.map((val, idx) => (
                            <div key={idx} className="w-full flex flex-col items-center gap-1 group">
                                <div
                                    className="w-full rounded-t-sm relative transition-all duration-700 bar-grow"
                                    style={{
                                        height: `${val}%`,
                                        background: `linear-gradient(to top, #ff0055, ${val > 70 ? "#a855f7" : "#3b82f6"})`,
                                        animationDelay: `${idx * 100}ms`,
                                    }}
                                >
                                    <div
                                        className="absolute -top-5 left-1/2 -translate-x-1/2 text-xxxs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {val}%
                                    </div>
                                </div>
                                <span className="text-xxxs text-text-dim">
                                    {["23h", "0h", "1h", "2h", "3h", "5h", "6h"][idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ── AI 分析建议 ── */}
                <Card className="p-4 bg-white/5 border-white/10">
                    <h3 className="text-xs font-bold text-text-dim mb-3 flex items-center gap-2 tracking-wider">
                        <span className="font-icon text-accent-cyan text-sm">psychology</span>
                        AI 分析建议 <span className="text-white/30">/ NEURAL TIPS</span>
                    </h3>
                    <div className="space-y-2.5">
                        {report.tips.map((tip, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                                <span className="text-primary text-xxs mt-0.5 shrink-0">▸</span>
                                <p className="text-xs text-white/80 leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </main>

            {/* ── 底部 CTA ── */}
            <div
                className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto px-5 pb-6 pt-3 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent">
                <Button
                    className="w-full h-14 text-lg font-bold tracking-widest bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30"
                    onClick={handleEnterSleep}
                >
                    <span className="flex items-center justify-center gap-3">
                        <span className="font-icon text-xl">bedtime</span>
                        进入睡眠模式
                    </span>
                </Button>
                <p className="text-center text-xxxs text-text-dim mt-2 font-mono tracking-wider">
                    ENTER SLEEP MODE — NEURAL SYNC READY
                </p>
            </div>
        </div>
    );
}
