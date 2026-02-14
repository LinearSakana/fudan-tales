import {useEffect, useMemo, useRef, useState} from "react";
import BilingualText from "./ui/BilingualText";
import {createWebAudioEngine} from "./audio/web-audio-engine";
import {Button} from "./ui/button";
import {badgeVariants} from "./ui/badge";
import {Slider} from "./ui/slider";
import {cn} from "@/lib/utils";
import {Card} from "./ui/card";

export default function SoundscapeMixer({
                                            presets,
                                            channels,
                                            activePresetId,
                                            levels,
                                            isPreviewing,
                                            onPresetChange,
                                            onChannelChange,
                                            onPreviewToggle,
                                        }) {
    const engineRef = useRef(null);
    const [audioReady, setAudioReady] = useState(false);

    const activePreset = useMemo(
        () => presets.find((preset) => preset.id === activePresetId) || presets[0],
        [activePresetId, presets],
    );

    useEffect(() => {
        engineRef.current = createWebAudioEngine();
        return () => {
            engineRef.current?.dispose();
        };
    }, []);

    useEffect(() => {
        if (!isPreviewing) return;
        engineRef.current?.update(levels);
    }, [levels, isPreviewing]);

    const handleTogglePreview = async () => {
        if (isPreviewing) {
            engineRef.current?.stop();
            onPreviewToggle(false);
            return;
        }

        const ready = await engineRef.current?.play(levels);
        setAudioReady(Boolean(ready));
        onPreviewToggle(Boolean(ready));
    };

    const handleLevelChange = (channelId, value) => {
        onChannelChange(channelId, Number(value));
    };

    return (
        <Card hud={'hover'} className="rounded-l border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
                <BilingualText cn="声景调谐台" en="SOUNDSCAPE_MIXER" className="text-xs font-bold"/>
                <Button
                    variant={isPreviewing ? "default" : "secondary"}
                    size="sm"
                    onClick={handleTogglePreview}
                    className="px-3 py-1.5 text-[10px] h-auto"
                >
                    <span className="font-icon text-sm">{isPreviewing ? "stop_circle" : "play_circle"}</span>
                    <span>{isPreviewing ? "STOP_PREVIEW" : "PLAY_PREVIEW"}</span>
                </Button>
            </div>

            <p className="text-[10px] text-text-dim mb-3 leading-relaxed">
                {activePreset?.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
                {presets.map((preset) => {
                    const selected = preset.id === activePresetId;
                    return (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => onPresetChange(preset.id)}
                            className={cn(
                                badgeVariants({variant: selected ? "default" : "secondary"}),
                                "transition-colors px-2.5 py-1 cursor-pointer",
                                !selected && "hover:border-primary/30 hover:text-primary"
                            )}
                        >
                            {preset.name}
                        </button>
                    );
                })}
            </div>

            <div className="space-y-3">
                {channels.map((channel) => (
                    <div key={channel.id}>
                        <div className="flex items-center justify-between text-[10px] mb-1">
                            <span className="text-white/85 tracking-wide">{channel.label}</span>
                            <span className="font-mono text-text-dim">{levels[channel.id]}%</span>
                        </div>
                        <Slider
                            min={channel.min}
                            max={channel.max}
                            step={channel.step}
                            value={[levels[channel.id]]}
                            onValueChange={([val]) => handleLevelChange(channel.id, val)}
                        />
                    </div>
                ))}
            </div>

            <div
                className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-text-dim">
                <span className="tracking-widest">AUDIO_ENGINE: {audioReady ? "WEBAUDIO_DEMO" : "READY_PENDING"}</span>
                <span className={isPreviewing ? "text-primary animate-pulse" : ""}>
                    {isPreviewing ? "LIVE_MONITORING" : "STANDBY"}
                </span>
            </div>
        </Card>
    );
}
