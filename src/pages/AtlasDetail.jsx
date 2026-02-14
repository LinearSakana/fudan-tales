import {defaultDetail, detailsByCode} from "../data/card-details";
import {cards} from "../data/cards";
import BilingualText from "../components/ui/BilingualText";
import {useEffect, useMemo} from "react";
import {useNavigate, useParams} from "react-router-dom";
import LayoutEffects from "../components/layout/LayoutEffects";
import Header from "../components/ui/Header";
import {Progress} from "../components/ui/progress";
import {Button} from "../components/ui/button";


function clamp01(x) {
    return Math.max(0, Math.min(1, x));
}

function deriveArchiveNo(code) {
    // 暂时用 code 的后缀展示
    // SCP-FD-082 -> 档案编号 082
    const m = String(code || "").match(/(\d+)\s*$/);
    return m ? `档案编号 ${m[1]}` : `档案编号 ${code || "UNKNOWN"}`;
}

export default function AtlasDetail() {
    const {code} = useParams();
    const navigate = useNavigate();

    const entity = useMemo(
        () => cards.find((c) => c.type === "entity" && c.code === code),
        [code]
    );

    const raw = detailsByCode[entity.code] || {};
    const detail = {
        ...defaultDetail,
        ...raw,
        decrypt: {...defaultDetail.decrypt, ...(raw.decrypt || {})},
        photo: {...defaultDetail.photo, ...(raw.photo || {})},
        supply: {...defaultDetail.supply, ...(raw.supply || {})},
    };


    useEffect(() => {
        document.title = entity ? `${entity.title} · 异闻图鉴` : "未找到 · 异闻图鉴";
    }, [entity]);

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
                    <div className="mt-6 text-text-dim text-sm">条目不存在或未收录</div>
                </div>
            </div>
        );
    }

    const pct = Math.round(clamp01(entity.progress) * 100);
    const archiveNo = detail.archiveNo || deriveArchiveNo(entity.code);

    const statusLabel = entity.status === "contained" ? "异常已收容" : "解析中";
    const statusIcon = entity.status === "contained" ? "verified_user" : "query_stats";

    // 这块属于示例里的“照片信息/天气/时间/警告”，后面可以做成数据字段
    // zone 可能是 string / array / undefined
    const zoneText = Array.isArray(entity.zone)
        ? entity.zone[0]
        : entity.zone;

    // 约定默认格式：#复旦_区域名
    const fallbackTag = zoneText
        ? `#复旦_${zoneText}`
        : defaultDetail.photo.tag;

    const photoTag = detail.photo.tag || fallbackTag;
    const photoMeta = detail.photo.meta;
    const warningText = detail.photo.warning;

    return (
        <div
            className="bg-background-light dark:bg-background-dark min-h-screen font-display antialiased overflow-x-hidden">
            <div className="layout-page layout-frame-light shadow-2xl border-x border-gray-800">
                <LayoutEffects noise="soft" grid/>
                <Header
                    title={entity.title}
                    subtitle={archiveNo}
                    additionalClass={"glitch-text tracking-wide"}
                    rightText={detail.connectionText}
                />

                <main className="flex-1 flex flex-col p-4 gap-6 relative z-10">
                    {/* Progress */}
                    <section className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <p className="text-white text-sm font-medium tracking-widest uppercase">解密进度</p>
                            <p className="text-primary font-mono text-xs animate-pulse">{pct}% COMPLETED</p>
                        </div>
                        <Progress
                            value={pct}
                            className="h-3 bg-[#361721]"
                            indicatorClassName="bg-primary shadow-[0_0_10px_rgba(255,0,85,0.5)]"
                        />
                        <p className="text-[#ce8da3] text-xs font-mono uppercase mt-1">
                            &gt; {detail.decrypt.hint}
                        </p>
                    </section>

                    {/* Archive body */}
                    <section className="relative group" style={{perspective: "1000px"}}>
                        <div
                            className="bg-[#d4c5a9] dark:bg-[#3d332a] rounded-lg p-1 shadow-lg transform rotate-[-1deg] transition-transform duration-500 hover:rotate-0 border-t border-white/10 relative overflow-hidden">
                            <div
                                className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none"/>
                            <div
                                className="bg-[#240f16] rounded p-4 relative overflow-hidden min-h-[440px] flex flex-col">
                                {/* Stamp */}
                                <div
                                    className="absolute top-4 right-4 z-20 transform rotate-12 opacity-80 mix-blend-overlay">
                                    <div className="stamp-box px-4 py-2">
                                        <span
                                            className="text-primary font-black text-5xl font-extra tracking-[0.2em] uppercase">{detail.protocol}</span>
                                    </div>
                                </div>

                                {/* Photo */}
                                <div
                                    className="relative bg-white p-3 pb-6 shadow-xl transform rotate-2 w-full max-w-[90%] mx-auto mt-2 mb-6 z-10">
                                    <div
                                        className="aspect-[4/3] bg-gray-900 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]">
                                        <div
                                            className="w-full h-full bg-cover bg-center mix-blend-luminosity contrast-125 brightness-90"
                                            style={{backgroundImage: `url("${detail.photo.imageUrl || entity.coverUrl}")`}}
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-30 mix-blend-color-dodge"/>
                                        <div className="absolute bottom-2 left-2 flex items-center gap-1">
                                            <span
                                                className="font-icon text-white text-[12px]">{statusIcon}</span>
                                            <span
                                                className="text-white text-xxs font-mono tracking-wider">{statusLabel}</span>
                                        </div>
                                    </div>

                                    <div className="mt-2 text-gray-800">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-sm font-bold tracking-wide">{photoTag}</p>
                                                <p className="text-xxs opacity-70 font-mono">{photoMeta}</p>
                                            </div>
                                            <span
                                                className="font-icon text-gray-400 text-sm">{detail.supply.icon}</span>
                                        </div>
                                        <div className="border-t border-gray-200 mt-2 pt-1">
                                            <p className="text-xxxs text-gray-500 leading-tight">{warningText}</p>
                                        </div>
                                    </div>

                                    {/* Paperclip */}
                                    <div className="absolute -bottom-4 right-4 w-6 h-12 z-30 drop-shadow-md">
                                        <svg fill="none" stroke="#a0aec0" strokeWidth="2" viewBox="0 0 24 48">
                                            <path
                                                d="M16 42V10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10V38C4 40.2091 5.79086 42 8 42C10.2091 42 12 40.2091 12 38V10"/>
                                        </svg>
                                    </div>
                                </div>

                                {/* Supply note */}
                                <div
                                    className="relative bg-[#fffdf5] text-gray-900 p-4 shadow-lg transform -rotate-1 w-[95%] mx-auto mt-[-10px] z-20 border-l-4 border-primary">
                                    <div
                                        className="absolute -top-[8px] left-0 w-full h-[8px] bg-[#fffdf5]"
                                        style={{
                                            maskImage:
                                                "radial-gradient(circle at 8px bottom, transparent 8px, black 8.5px)",
                                            maskSize: "16px 100%",
                                            maskPosition: "bottom",
                                        }}
                                    />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <BilingualText cn={detail.supply.typeLabelCn} en={detail.supply.typeLabelEn}
                                                           className="mb-2 text-xxs text-gray-700"/>
                                            <p className="text-xxs font-bold text-gray-500 uppercase mb-1">{detail.supply.typeLabel}</p>
                                            <h3 className="text-lg font-bold leading-tight mb-1">{detail.supply.title}</h3>
                                            <div
                                                className="flex items-baseline gap-1 text-primary font-extra font-mono">
                                                <span className="text-3xl">{detail.supply.discountNum}</span>
                                                <span
                                                    className="text-2xl tracking-[-0.1em]">{detail.supply.discountUnit}</span>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1 font-mono">{detail.supply.item}</p>
                                        </div>
                                        <div className="border-2 border-gray-900 p-1 rounded-sm">
                                            <span
                                                className="font-icon text-2xl text-gray-900">restaurant</span>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex gap-0.5 h-6 opacity-60">
                                        <div className="w-1 bg-black"/>
                                        <div className="w-2 bg-black"/>
                                        <div className="w-px bg-black"/>
                                        <div className="w-3 bg-black"/>
                                        <div className="w-1 bg-black"/>
                                        <div className="w-2 bg-black"/>
                                        <div className="w-px bg-black"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* grid overlay */}
            </div>
        </div>
    );
}
