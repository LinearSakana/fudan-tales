import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import BottomNav from "../components/ui/BottomNav.jsx";
import LayoutEffects from "../components/layout/LayoutEffects";
import ActionButton from "../components/ui/ActionButton";
import BilingualText from "../components/ui/BilingualText";
import BroadcastTicker from "../components/BroadcastTicker";
import CircadianDial from "../components/CircadianDial";
import SoundscapeMixer from "../components/SoundscapeMixer";
import TomorrowQuestDock from "../components/TomorrowQuestDock";
import {
    broadcastMessages,
    fixedQuestTemplates,
    quickActions,
    randomQuestPool,
    soundChannels,
    soundPresets,
} from "../data/home-data";
import {currentUser} from "../data/user-data";

const DEFAULT_PRESET_ID = soundPresets[0]?.id || "";

function buildLevelsByPreset(presetId) {
    const preset = soundPresets.find((item) => item.id === presetId) || soundPresets[0];
    const defaults = preset?.channelDefaults || {};

    return soundChannels.reduce((acc, channel) => {
        acc[channel.id] = Number(defaults[channel.id] ?? channel.defaultValue ?? 0);
        return acc;
    }, {});
}

function createRandomQuest(excludeTemplateId = null) {
    const candidates = randomQuestPool.filter((item) => item.id !== excludeTemplateId);
    const pool = candidates.length > 0 ? candidates : randomQuestPool;
    const picked = pool[Math.floor(Math.random() * pool.length)] || randomQuestPool[0];

    return {
        id: `${picked.id}-${Date.now()}`,
        templateId: picked.id,
        title: picked.title,
        subtitle: picked.subtitle,
        kind: "random",
        done: false,
    };
}

function buildInitialQuests() {
    const fixedQuests = fixedQuestTemplates.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        kind: "fixed",
        done: false,
    }));

    return [...fixedQuests, createRandomQuest()];
}

import {Card} from "../components/ui/card";

export default function Home() {
    const navigate = useNavigate();

    const [booted, setBooted] = useState(false);
    const [syncProgress, setSyncProgress] = useState(0);

    // 声景状态仅保留在当前页面会话中，刷新后重置。
    const [activePresetId, setActivePresetId] = useState(DEFAULT_PRESET_ID);
    const [channelLevels, setChannelLevels] = useState(() => buildLevelsByPreset(DEFAULT_PRESET_ID));
    const [isPreviewing, setIsPreviewing] = useState(false);

    // 任务卡槽采用「2 固定 + 1 随机」策略，并支持锁定随机位。
    const [quests, setQuests] = useState(() => buildInitialQuests());
    const [isQuestLocked, setIsQuestLocked] = useState(false);

    const noiseLevel = useMemo(() => {
        if (soundChannels.length === 0) return 0;
        const total = soundChannels.reduce((sum, channel) => {
            return sum + Number(channelLevels[channel.id] ?? 0);
        }, 0);
        return Math.round(total / soundChannels.length);
    }, [channelLevels]);

    useEffect(() => {
        document.title = "控制台 | COMMAND";
        const timer = setTimeout(() => {
            setBooted(true);
            setSyncProgress(Number(currentUser?.stats?.efficiency?.val || 64));
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSync = () => {
        if (syncProgress < 100) {
            setSyncProgress((prev) => {
                const randomStep = Math.random() * (12 - 3) + 3;
                const nextValue = prev + randomStep;
                return Math.min(100, nextValue);
            });
        }
    };

    const handlePresetChange = (presetId) => {
        setActivePresetId(presetId);
        setChannelLevels(buildLevelsByPreset(presetId));
    };

    const handleChannelChange = (channelId, value) => {
        setChannelLevels((prev) => ({
            ...prev,
            [channelId]: value,
        }));
    };

    const handleToggleQuest = (questId) => {
        setQuests((prev) => prev.map((quest) => (
            quest.id === questId ? {...quest, done: !quest.done} : quest
        )));
    };

    const handleRegenerateRandomQuest = () => {
        if (isQuestLocked) return;

        setQuests((prev) => {
            const fixedDoneMap = new Map(
                prev
                    .filter((quest) => quest.kind === "fixed")
                    .map((quest) => [quest.id, quest.done]),
            );

            const fixedQuests = fixedQuestTemplates.map((item) => ({
                id: item.id,
                title: item.title,
                subtitle: item.subtitle,
                kind: "fixed",
                done: Boolean(fixedDoneMap.get(item.id)),
            }));

            const currentRandom = prev.find((quest) => quest.kind === "random");
            return [...fixedQuests, createRandomQuest(currentRandom?.templateId || null)];
        });
    };

    return (
        <div className="layout-page layout-frame font-mono text-white relative min-h-screen">
            <LayoutEffects
                noise={noiseLevel > 55 ? "strong" : "soft"}
                scanlines={true}
            />

            <div
                className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay transition-opacity duration-300"
                style={{opacity: Math.max(0, (noiseLevel - 20) / 100)}}
            >
                <div className="w-full h-full bg-noise opacity-50"/>
            </div>

            <header
                className={`shrink-0 p-5 pb-0 flex justify-between items-start transition-all duration-700 ${booted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                <div>
                    <div className="flex items-center gap-2 text-primary mb-1">
                        <span className="font-icon text-sm">terminal</span>
                        <span className="text-xs font-bold tracking-widest">COMMAND CENTER</span>
                    </div>
                    <h1 className="text-xl font-display font-bold tracking-wide text-white">
                        WELCOME, <span className="text-text-dim">{currentUser.name}</span>
                    </h1>
                    <div className="text-[10px] text-text-dim mt-1 flex gap-2">
                        <span>// DATE: 2077.11.02</span>
                        <span className={noiseLevel > 80 ? "text-red-500 font-bold animate-pulse" : ""}>
                            // REALITY: {noiseLevel > 80 ? "UNSTABLE" : "STABLE"}
                        </span>
                    </div>
                </div>
                <Card
                    className="p-2 rounded flex flex-col items-center justify-center w-12 h-12 bg-card/80 backdrop-blur-sm border-white/10">
                    <span className="font-icon text-xl text-teal-400">cloud</span>
                    <span className="text-[9px] font-bold">24°C</span>
                </Card>
            </header>

            <main className="px-5 pb-32 pt-6 relative z-10 space-y-8">
                <section
                    className={`transition-all duration-700 ease-out ${booted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                    <CircadianDial progress={syncProgress} onSync={handleSync}/>

                    <div className="text-center -mt-4 mb-6">
                        <p className="text-[10px] text-text-dim animate-pulse">
                            {syncProgress >= 100 ? "SYNC COMPLETE" : "TAP TO STABILIZE WAVEFORM"}
                        </p>
                    </div>
                </section>

                <section
                    className={`mb-6 transition-all duration-700 delay-200 ${booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <BilingualText cn="快捷指令" en="TACTICAL_DECK" className="text-xs font-bold"/>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action, idx) => (
                            <ActionButton
                                key={idx}
                                icon={action.icon}
                                label={action.label}
                                sub={action.sub}
                                onClick={() => {
                                    if (action.sub === "ATLAS") navigate("/atlas");
                                    // Add vibrations or sound effects here if possible
                                }}
                                disabled={idx === 2}
                            />
                        ))}
                    </div>
                </section>

                <section
                    className={`space-y-4 transition-all duration-700 delay-300 ${booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <SoundscapeMixer
                        presets={soundPresets}
                        channels={soundChannels}
                        activePresetId={activePresetId}
                        levels={channelLevels}
                        isPreviewing={isPreviewing}
                        onPresetChange={handlePresetChange}
                        onChannelChange={handleChannelChange}
                        onPreviewToggle={setIsPreviewing}
                    />

                    <TomorrowQuestDock
                        quests={quests}
                        isLocked={isQuestLocked}
                        onToggleQuest={handleToggleQuest}
                        onRegenerateRandom={handleRegenerateRandomQuest}
                        onToggleLock={() => setIsQuestLocked((prev) => !prev)}
                    />
                </section>
            </main>

            <BroadcastTicker messages={broadcastMessages}/>
            <BottomNav activeKey="home"/>
        </div>
    );
}
