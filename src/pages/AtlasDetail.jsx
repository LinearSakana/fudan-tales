import {defaultDetail, detailsByCode} from "../data/card-details";
import {cards} from "../data/cards";
import BilingualText from "../components/ui/BilingualText";
import {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import LayoutEffects from "../components/layout/LayoutEffects";
import Header from "../components/ui/Header";
import {Progress} from "../components/ui/Progress";
import {Button} from "../components/ui/Button";
import {Card} from "../components/ui/Card";
import {Badge} from "../components/ui/Badge";

/** 将数值限制在 [0, 1] 范围内 */
function clamp01(x) {
    return Math.max(0, Math.min(1, x));
}

/** 从条目代号中推导出档案编号 */
function deriveArchiveNo(code) {
    const m = String(code || "").match(/(\d+)\s*$/);
    return m ? `档案编号 ${m[1]}` : `档案编号 ${code || "UNKNOWN"}`;
}

/** 危险等级配置 */
const DANGER_CONFIG = [
    {label: "SAFE", color: "text-teal-400", bg: "bg-teal-400/10", border: "border-teal-400/30"},
    {label: "SAFE+", color: "text-teal-400", bg: "bg-teal-400/10", border: "border-teal-400/30"},
    {label: "EUCLID", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30"},
    {label: "KETER", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30"},
    {label: "APOLLYON", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30"},
];

export default function AtlasDetail() {
    const {code} = useParams();
    const navigate = useNavigate();

    const [booted, setBooted] = useState(false);
    const [showContainment, setShowContainment] = useState(false);
    const [typedHint, setTypedHint] = useState("");

    const entity = useMemo(
        () => cards.find((c) => c.type === "entity" && c.code === code),
        [code],
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = entity
            ? `${entity.title} · 异闻图鉴`
            : "未找到 · 异闻图鉴";
        const timer = setTimeout(() => setBooted(true), 10);
        return () => clearTimeout(timer);
    }, [entity]);

    // 合并详情
    const detail = useMemo(() => {
        if (!entity) return defaultDetail;
        const raw = detailsByCode[entity.code] || {};
        return {
            ...defaultDetail,
            ...raw,
            decrypt: {...defaultDetail.decrypt, ...(raw.decrypt || {})},
            photo: {...defaultDetail.photo, ...(raw.photo || {})},
            supply: {...defaultDetail.supply, ...(raw.supply || {})},
        };
    }, [entity]);

    // 打字机效果
    useEffect(() => {
        if (!booted || !detail.decrypt.hint) return;
        const fullText = detail.decrypt.hint;
        let i = 0;
        setTypedHint("");
        const interval = setInterval(() => {
            i++;
            setTypedHint(fullText.slice(0, i));
            if (i >= fullText.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, [booted, detail.decrypt.hint]);

    if (!entity) {
        return (
            <div className="min-h-screen bg-background-dark text-white">
                <div className="max-w-md mx-auto p-4">
                    <Button
                        variant="link"
                        onClick={() => navigate("/atlas")}
                        className="text-primary font-bold p-0 h-auto"
                    >
                        返回图鉴
                    </Button>
                    <div className="mt-6 text-text-dim text-sm">
                        条目不存在或未收录
                    </div>
                </div>
            </div>
        );
    }

    const pct = Math.round(clamp01(entity.progress) * 100);
    const archiveNo = detail.archiveNo || deriveArchiveNo(entity.code);
    const statusLabel =
        entity.status === "contained" ? "已收容" : "解析中";
    const statusIcon =
        entity.status === "contained" ? "verified_user" : "query_stats";

    const zoneText = Array.isArray(entity.zone)
        ? entity.zone.join(" / ")
        : entity.zone || "未知区域";

    const danger = DANGER_CONFIG[Math.min(detail.dangerLevel, 5) - 1] || DANGER_CONFIG[0];

    const photoTag = detail.photo.tag || `#复旦_${zoneText}`;
    const timeline = detail.timeline || defaultDetail.timeline;

    return (
        <div className="bg-background-dark min-h-screen font-display antialiased overflow-x-hidden">
            <div className="layout-page layout-frame shadow-2xl border-x border-gray-800">
                <LayoutEffects noise="soft" scanlines/>
                <div
                    className={`duration-500 relative z-20 ${booted ? "opacity-100" : "opacity-30 blur-sm"}`}>
                    <Header
                        title={entity.title}
                        subtitle={archiveNo}
                        additionalClass="glitch-text tracking-wide"
                        rightText={detail.connectionText}
                    />
                </div>
                <main className="flex-1 flex flex-col p-4 gap-5 relative z-10 pb-10">
                    {/* ======== Section 1: Entity Profile Card ======== */}
                    <section
                        className={`transition-all duration-700 ${booted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
                    >
                        <Card
                            className="rounded-xl overflow-hidden relative group bg-black/40 backdrop-blur-md border-white/10">
                            {/* 装饰编号大字 */}
                            <div
                                className="absolute -top-2 -right-2 text-8xl opacity-[0.04] font-black font-extra tracking-tighter pointer-events-none select-none">
                                {entity.code.split("-").pop()}
                            </div>

                            <div className="flex gap-4 p-4 relative z-10">
                                {/* 封面图 */}
                                <div
                                    className="w-28 h-36 rounded-lg overflow-hidden relative shrink-0 border border-white/10">
                                    <div
                                        className="w-full h-full bg-cover bg-center grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                                        style={{
                                            backgroundImage: `url("${detail.photo.imageUrl || entity.coverUrl}")`,
                                        }}
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                                    <div className="absolute inset-0 effect-scanlines-soft opacity-20"/>
                                    {/* 状态角标 */}
                                    <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1">
                                        <span className="font-icon text-primary text-[10px]">
                                            {statusIcon}
                                        </span>
                                        <span className="text-white text-[9px] font-mono tracking-wider">
                                            {statusLabel}
                                        </span>
                                    </div>
                                </div>

                                {/* 右侧信息 */}
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div>
                                        <p className="text-xxs text-text-dim font-mono tracking-widest mb-1">
                                            {entity.code}
                                        </p>
                                        <h2 className="text-xl font-display font-bold text-white leading-tight mb-2">
                                            {entity.title}
                                        </h2>
                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                            <Badge
                                                variant="secondary"
                                                className={`${danger.color} ${danger.bg} border ${danger.border}`}
                                            >
                                                {danger.label}
                                            </Badge>
                                            <Badge variant="secondary">
                                                {zoneText}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-icon text-text-dim text-xs">
                                            location_on
                                        </span>
                                        <span className="text-xxs text-text-dim font-mono">
                                            {photoTag}
                                        </span>
                                        <span className="text-xxs text-text-dim font-mono ml-auto">
                                            {detail.photo.meta}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 危险等级指示条 */}
                            <div className="flex gap-0.5 px-4 pb-3">
                                {[1, 2, 3, 4, 5].map((lv) => (
                                    <div
                                        key={lv}
                                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${lv <= detail.dangerLevel
                                            ? lv <= 2
                                                ? "bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.4)]"
                                                : lv <= 3
                                                    ? "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.4)]"
                                                    : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]"
                                            : "bg-white/10"
                                        }`}
                                    />
                                ))}
                            </div>
                        </Card>
                    </section>

                    {/* ======== Section 2: Decryption Progress ======== */}
                    <section
                        className={`transition-all duration-700 delay-100 ${booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-icon text-primary text-sm">
                                lock_open
                            </span>
                            <BilingualText
                                cn="解密进度"
                                en="DECRYPTION PROGRESS"
                                className="text-xs font-bold"
                            />
                            <span className="ml-auto text-primary font-mono text-xs animate-pulse">
                                {pct}%
                            </span>
                        </div>
                        <Progress
                            value={pct}
                            className="h-2.5 bg-white/5 border border-white/10 rounded-full"
                            indicatorClassName="bg-gradient-to-r from-primary-dark to-primary shadow-[0_0_12px_rgba(255,0,85,0.5)] rounded-full"
                        />
                        <p className="text-[#ce8da3] text-xs font-mono mt-2 min-h-[1.25rem]">
                            &gt; {typedHint}
                            <span
                                className="inline-block w-1.5 h-3.5 bg-primary/80 ml-0.5 animate-pulse align-middle"/>
                        </p>
                    </section>

                    {/* ======== Section 3: Archive Description ======== */}
                    <section
                        className={`transition-all duration-700 delay-200 ${booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                            <span className="font-icon text-primary text-sm">
                                description
                            </span>
                            <BilingualText
                                cn="档案描述"
                                en="ARCHIVE DESCRIPTION"
                                className="text-xs font-bold"
                            />
                        </div>

                        <Card
                            hud="hover"
                            className="rounded-xl p-4 border-l-4 border-l-primary bg-black/40 backdrop-blur-sm border-white/10 relative overflow-hidden card-hover-glow"
                        >
                            <div className="absolute inset-0 effect-scanlines-soft opacity-10"/>
                            <div className="relative z-10 space-y-3">
                                <p className="text-sm text-white/90 leading-relaxed">
                                    {detail.description}
                                </p>

                                {/* 警告文本 */}
                                <div
                                    className="flex items-start gap-2 bg-red-500/5 border border-red-500/20 rounded-lg p-3 mt-2">
                                    <span className="font-icon text-red-400 text-sm shrink-0 mt-0.5">
                                        warning
                                    </span>
                                    <p className="text-xxs text-red-300/80 font-mono leading-relaxed">
                                        {detail.photo.warning}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* 收容措施：折叠面板 */}
                        <div className="mt-3">
                            <button
                                onClick={() =>
                                    setShowContainment((prev) => !prev)
                                }
                                className="w-full flex items-center justify-between text-left p-3 rounded-lg bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-icon text-yellow-400 text-sm">
                                        shield
                                    </span>
                                    <BilingualText
                                        cn="收容措施"
                                        en="CONTAINMENT"
                                        className="text-xxs font-bold"
                                    />
                                </div>
                                <span
                                    className={`font-icon text-white/40 text-sm transition-transform duration-300 ${showContainment ? "rotate-180" : ""}`}
                                >
                                    expand_more
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-out ${showContainment ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                            >
                                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                                    <p className="text-xs text-text-dim leading-relaxed font-mono">
                                        &gt; {detail.containment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ======== Section 4: Timeline ======== */}
                    <section
                        className={`transition-all duration-700 delay-300 ${booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                            <span className="font-icon text-primary text-sm">
                                timeline
                            </span>
                            <BilingualText
                                cn="事件时间线"
                                en="EVENT TIMELINE"
                                className="text-xs font-bold"
                            />
                        </div>

                        <div className="relative pl-6">
                            {/* 竖线 */}
                            <div
                                className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"/>

                            {timeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`relative mb-4 last:mb-0 transition-all duration-500 ${booted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                                    style={{
                                        transitionDelay: `${400 + idx * 100}ms`,
                                    }}
                                >
                                    {/* 节点 */}
                                    <div
                                        className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-primary bg-background-dark shadow-[0_0_8px_rgba(255,0,85,0.4)]"/>

                                    <Card
                                        className="rounded-lg p-3 bg-black/30 backdrop-blur-sm border-white/5 hover:border-primary/30 transition-colors group card-hover-glow">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xxs text-primary font-mono font-bold mb-0.5">
                                                    {item.date}
                                                </p>
                                                <p className="text-xs text-white/80 leading-relaxed">
                                                    {item.event}
                                                </p>
                                            </div>
                                            <span
                                                className="font-icon text-white/10 text-sm group-hover:text-primary/40 transition-colors shrink-0">
                                                arrow_forward
                                            </span>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ======== Section 5: Supply Info ======== */}
                    <section
                        className={`transition-all duration-700 delay-[450ms] ${booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                            <span className="font-icon text-primary text-sm">
                                inventory_2
                            </span>
                            <BilingualText
                                cn="关联补给"
                                en="LINKED SUPPLY"
                                className="text-xs font-bold"
                            />
                        </div>

                        <Card
                            hud="hover"
                            className="rounded-xl p-4 bg-black/40 backdrop-blur-sm border-white/10 border-l-4 border-l-primary relative overflow-hidden card-hover-glow"
                        >
                            <div className="absolute inset-0 effect-scanlines-soft opacity-10"/>
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-xxs font-bold text-text-dim uppercase tracking-widest mb-1">
                                        {detail.supply.typeLabelCn ||
                                            "特别补给"}{" "}
                                        /{" "}
                                        {detail.supply.typeLabelEn ||
                                            "SPECIAL SUPPLY"}
                                    </p>
                                    <h3 className="text-lg font-bold text-white leading-tight mb-1.5">
                                        {detail.supply.title}
                                    </h3>
                                    <div
                                        className="flex items-baseline gap-1 text-primary font-extra font-mono mb-1">
                                        <span className="text-3xl font-bold">
                                            {detail.supply.discountNum}
                                        </span>
                                        <span className="text-lg tracking-tight">
                                            {detail.supply.discountUnit || "off"}
                                        </span>
                                    </div>
                                    <p className="text-xxs text-text-dim font-mono">
                                        {detail.supply.item}
                                    </p>
                                </div>
                                <div
                                    className="shrink-0 w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <span className="font-icon text-2xl text-white/60">
                                        {detail.supply.icon}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* ======== Section 6: Back Button ======== */}
                    <section
                        className={`pt-2 pb-6 transition-all duration-700 delay-500 ${booted ? "opacity-100" : "opacity-0"}`}
                    >
                        <Button
                            variant="outline"
                            onClick={() => navigate("/atlas")}
                            className="w-full border-white/10 hover:border-primary/50 hover:bg-primary/5 text-white h-12 tracking-widest text-xs font-bold"
                        >
                            <span className="font-icon text-sm mr-2">
                                arrow_back
                            </span>
                            返回异闻图鉴
                        </Button>
                    </section>
                </main>
            </div>
        </div>
    );
}
