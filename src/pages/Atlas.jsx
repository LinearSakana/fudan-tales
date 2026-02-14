import EntityCard from "../components/EntityCard";
import LockedCard from "../components/LockedCard";
import AtlasHeader from "../components/AtlasHeader";
import BottomNav from "../components/ui/BottomNav.jsx";
import {cards} from "../data/cards";
import {zones} from "../data/zones";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import LayoutEffects from "../components/layout/LayoutEffects";
import {Button} from "../components/ui/button";

export default function Atlas() {
    useEffect(() => {
        document.title = "ARCHIVE OF ANOMALIES - 异闻图鉴";
    }, []);

    const navigate = useNavigate();

    const [zone, setZone] = useState(zones[0]);
    const visibleCards = cards.filter((c) => {
        if (!c.zone) return true; // 没写 zone：全区可见
        if (Array.isArray(c.zone)) return c.zone.includes(zone); // 多区
        return c.zone === zone; // 单区
    });

    return (
        <div className="layout-page layout-frame">
            <LayoutEffects noise="strong" scanlines glow vignette/>

            <AtlasHeader
                title="异闻图鉴 ARCHIVE OF ANOMALIES"
                subtitle="系统状态：在线"
                schoolName="复旦大学"
                zones={zones}
                activeZone={zone}
                onZoneChange={setZone}
                syncText={`同步中: 98% COMPLETE // 区域：${zone}`}
            />

            <main className="relative z-10 flex-1 overflow-y-auto p-4 scroll-smooth">
                <div className="grid grid-cols-2 gap-4 pb-24">
                    {visibleCards.length === 0 ? (
                        <div className="col-span-2 text-center text-text-dim text-sm py-10">
                            当前区域暂无收录条目
                        </div>
                    ) : (visibleCards.map((c) => {
                        if (c.type === "locked") {
                            return (
                                <LockedCard
                                    key={c.id}
                                    requiredLevel={c.requiredLevel}
                                    coverUrl={c.coverUrl}
                                />
                            );
                        }

                        return (
                            <EntityCard
                                key={c.code}
                                code={c.code}
                                title={c.title}
                                coverUrl={c.coverUrl}
                                status={c.status}
                                progress={c.progress}
                                onClick={() => navigate(`/atlas/${c.code}`)}
                            />
                        );
                    }))}
                </div>
                <div className="fixed bottom-24 right-4 z-40">
                    <Button className="rounded-full px-4 py-3 h-auto shadow-[0_0_20px_rgba(255,0,85,0.3)]">
                        <span className="font-icon">terminal</span>
                        <span className="text-sm font-bold tracking-tight pr-1">商户模拟 [调试模式]</span>
                    </Button>
                </div>
            </main>
            <BottomNav activeKey="atlas"/>
        </div>
    );
}
