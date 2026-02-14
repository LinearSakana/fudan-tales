import BilingualText from "./ui/BilingualText";
import {Badge, badgeVariants} from "./ui/badge";
import {Button} from "./ui/button";
import {cn} from "@/lib/utils";
import {Card} from "./ui/card";

export default function TomorrowQuestDock({
                                              quests,
                                              isLocked,
                                              onToggleQuest,
                                              onRegenerateRandom,
                                              onToggleLock,
                                          }) {
    return (
        <Card hud={'hover'} className="rounded-l border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
                <BilingualText cn="明日预演卡槽" en="TOMORROW_QUEST_DOCK" className="text-xs font-bold"/>
                <button
                    type="button"
                    onClick={onToggleLock}
                    className={cn(
                        badgeVariants({variant: isLocked ? "warning" : "secondary"}),
                        "px-2.5 py-1 transition-colors cursor-pointer",
                        !isLocked && "hover:border-primary/30 hover:text-primary"
                    )}
                >
                    {isLocked ? "LOCKED" : "UNLOCKED"}
                </button>
            </div>

            <div className="space-y-2.5">
                {quests.map((quest, index) => (
                    <button
                        key={quest.id}
                        type="button"
                        onClick={() => onToggleQuest(quest.id)}
                        className={[
                            "w-full text-left rounded-lg border p-3 transition-colors",
                            quest.done ? "border-primary/45 bg-primary/10" : "border-white/10 bg-black/40 hover:bg-white/5",
                        ].join(" ")}
                    >
                        <div className="flex items-start gap-2">
                            <span
                                className={[
                                    "font-icon text-base mt-0.5",
                                    quest.done ? "text-primary" : "text-text-dim",
                                ].join(" ")}
                            >
                                {quest.done ? "task_alt" : "radio_button_unchecked"}
                            </span>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="secondary">SLOT_{index + 1}</Badge>
                                    <Badge variant={quest.kind === "random" ? "warning" : "default"}>
                                        {quest.kind === "random" ? "RANDOM" : "FIXED"}
                                    </Badge>
                                </div>
                                <p className="text-sm font-bold leading-tight text-white truncate">{quest.title}</p>
                                <p className="text-[10px] text-text-dim mt-1 truncate">{quest.subtitle}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-[9px] tracking-widest text-text-dim">2 FIXED + 1 RANDOM</span>
                <Button
                    variant="secondary"
                    size="sm"
                    disabled={isLocked}
                    onClick={onRegenerateRandom}
                    className={cn(
                        "text-[10px] px-3 py-1.5 h-auto",
                        isLocked && "opacity-40 cursor-not-allowed"
                    )}
                >
                    <span className="font-icon text-sm">cycle</span>
                    <span>REFRESH_RANDOM</span>
                </Button>
            </div>
        </Card>
    );
}
