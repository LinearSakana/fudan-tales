import BilingualText from "./ui/BilingualText";

export default function TomorrowQuestDock({
                                              quests,
                                              isLocked,
                                              onToggleQuest,
                                              onRegenerateRandom,
                                              onToggleLock,
                                          }) {
    return (
        <section className="glass-card rounded-xl border border-white/10 p-4 bg-black/35">
            <div className="flex items-center justify-between gap-3 mb-3">
                <BilingualText cn="明日预演卡槽" en="TOMORROW_QUEST_DOCK" className="text-xs font-bold"/>
                <button
                    type="button"
                    onClick={onToggleLock}
                    className={[
                        "badge px-2.5 py-1 transition-colors",
                        isLocked ? "badge-warning" : "badge-muted hover:border-primary/30 hover:text-primary",
                    ].join(" ")}
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
                            "w-full text-left card-base p-3 transition-colors",
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
                                    <span className="badge badge-muted">SLOT_{index + 1}</span>
                                    <span
                                        className={["badge", quest.kind === "random" ? "badge-warning" : "badge-primary"].join(" ")}>
                                        {quest.kind === "random" ? "RANDOM" : "FIXED"}
                                    </span>
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
                <button
                    type="button"
                    disabled={isLocked}
                    onClick={onRegenerateRandom}
                    className={[
                        "btn-base text-[10px] px-3 py-1.5 rounded-lg",
                        isLocked ? "opacity-40 cursor-not-allowed border border-white/10 text-text-dim" : "btn-secondary",
                    ].join(" ")}
                >
                    <span className="font-icon text-sm">cycle</span>
                    <span>REFRESH_RANDOM</span>
                </button>
            </div>
        </section>
    );
}
