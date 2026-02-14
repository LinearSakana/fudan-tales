import React from "react";
import {useNavigate} from "react-router-dom";
import LayoutEffects from "../components/layout/LayoutEffects";
import {Button} from "../components/ui/Button";
import {Card} from "../components/ui/Card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../components/ui/Tabs";
import BilingualText from "../components/ui/BilingualText";

const SLEEP_LOGS = [
    {date: "TODAY", duration: "7h 45m", quality: 92, score: "S"},
    {date: "YESTERDAY", duration: "6h 20m", quality: 78, score: "B"},
    {date: "NOV 01", duration: "8h 10m", quality: 95, score: "S+"},
    {date: "OCT 31", duration: "5h 30m", quality: 65, score: "C"},
    {date: "OCT 30", duration: "7h 15m", quality: 85, score: "A"},
];

export default function SleepData() {
    const navigate = useNavigate();

    return (
        <div
            className="layout-page layout-frame font-mono text-white relative min-h-screen flex flex-col bg-background-dark">
            <LayoutEffects noise="soft" scanlines={true}/>

            {/* Header */}
            <header className="relative z-20 p-6 flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/sleep")}
                    className="-ml-2 text-text-dim hover:text-white"
                >
                    <span className="font-icon">arrow_back</span>
                </Button>
                <div>
                    <BilingualText cn="睡眠数据" en="SLEEP_ANALYTICS" className="text-lg font-bold"/>
                </div>
            </header>

            <main className="relative z-20 flex-1 px-6 pb-12 overflow-y-auto">
                <Tabs defaultValue="weekly" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5">
                        <TabsTrigger value="weekly">WEEKLY</TabsTrigger>
                        <TabsTrigger value="monthly">MONTHLY</TabsTrigger>
                    </TabsList>

                    <TabsContent value="weekly" className="space-y-6">
                        {/* Sleep Quality Chart (CSS Bar Chart) */}
                        <Card className="p-4 bg-card border-white/10">
                            <h3 className="text-xs font-bold text-text-dim mb-4">SLEEP QUALITY (LAST 7 DAYS)</h3>
                            <div className="h-40 flex items-end justify-between gap-2">
                                {[65, 80, 45, 90, 75, 85, 92].map((val, idx) => (
                                    <div key={idx} className="w-full flex flex-col items-center gap-1 group">
                                        <div
                                            className="w-full bg-primary/30 rounded-t-sm relative transition-all duration-500 hover:bg-primary"
                                            style={{height: `${val}%`}}
                                        >
                                            <div
                                                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xxs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {val}%
                                            </div>
                                        </div>
                                        <span
                                            className="text-xxxs text-text-dim">{["M", "T", "W", "T", "F", "S", "S"][idx]}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <Card className="p-4 bg-card border-white/10 flex flex-col gap-1">
                                <span className="text-xxs text-text-dim">AVG. DURATION</span>
                                <span className="text-xl font-bold">7h 12m</span>
                            </Card>
                            <Card className="p-4 bg-card border-white/10 flex flex-col gap-1">
                                <span className="text-xxs text-text-dim">AVG. SCORE</span>
                                <span className="text-xl font-bold text-terminal-green">A</span>
                            </Card>
                        </div>

                        {/* Recent Logs List */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-text-dim">RECENT LOGS</h3>
                            {SLEEP_LOGS.map((log, idx) => (
                                <Card key={idx}
                                      className="p-3 bg-white/5 border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors">
                                    <div>
                                        <p className="font-bold text-sm">{log.date}</p>
                                        <p className="text-xs text-text-dim">{log.duration}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-xs font-bold">{log.quality}%</p>
                                            <p className="text-xxxs text-text-dim">QUALITY</p>
                                        </div>
                                        <div
                                            className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm border ${log.score.startsWith("S") ? "border-amber-400 text-amber-400" : "border-white/20 text-white"}`}>
                                            {log.score}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="monthly">
                        <div className="h-64 flex items-center justify-center text-text-dim text-xs">
                            NO DATA AVAILABLE
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
