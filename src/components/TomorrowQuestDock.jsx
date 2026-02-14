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
        <Card hud={'static'} className="rounded-l border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
                <BilingualText cn="明日预演卡槽" en="TOMORROW_QUEST_DOCK" className="text-xs font-bold"/>
                <Button
                    variant={isLocked ? "default" : "secondary"}
                    size="sm"
                    onClick={onToggleLock}
                    className={cn(
                        badgeVariants({variant: isLocked ? "warning" : "secondary"}),
                        "px-2.5 py-1 transition-colors cursor-pointer h-auto",
                        !isLocked && "hover:border-primary/30 hover:text-primary"
                    )}
                >
                    <span className="font-icon text-sm">{isLocked ? "lock" : "lock_open"}</span>
                    <span>{isLocked ? "LOCKED" : "UNLOCKED"}</span>
                </Button>
            </div>

            <div className="space-y-2.5">
                {quests.map((quest, index) => (
                    <Card
                        key={quest.id}
                        hud="hover"
                        onClick={() => onToggleQuest(quest.id)}
                        className={cn(
                            "w-full text-left p-3.5 transition-all cursor-pointer",
                            quest.done ? "border-primary/45 bg-primary/10" : "border-white/10 bg-black/40 hover:bg-white/5",
                        )}
                    >
                        <div className="flex items-start gap-2">
                            <span
                                className={cn(
                                    "font-icon text-base mt-0.5",
                                    quest.done ? "text-primary" : "text-text-dim",
                                )}
                            >
                                {quest.done ? "task_alt" : "radio_button_unchecked"}
                            </span>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary" className={"text-xxxs"}>SLOT_{index + 1}</Badge>
                                    <Badge variant={quest.kind === "random" ? "warning" : "default"}
                                           className={"text-xxxs"}>
                                        {quest.kind === "random" ? "RANDOM" : "FIXED"}
                                    </Badge>
                                </div>
                                <p className="text-sm font-bold leading-tight text-white truncate">{quest.title}</p>
                                <p className="text-xxs text-text-dim mt-1 truncate">{quest.subtitle}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-xxxs tracking-widest text-text-dim">2 FIXED + 1 RANDOM</span>
                <Button
                    variant="secondary"
                    size="sm"
                    disabled={isLocked}
                    onClick={onRegenerateRandom}
                    className={cn(
                        "text-xxs px-3 py-1.5 h-auto",
                        isLocked && "opacity-30 cursor-not-allowed"
                    )}
                >
                    <span className="font-icon text-sm">cycle</span>
                    <span>REFRESH_RANDOM</span>
                </Button>
            </div>
        </Card>
    );
}
