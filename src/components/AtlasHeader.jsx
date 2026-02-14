import {Button} from "./ui/button";
import {Tabs, TabsList, TabsTrigger} from "./ui/tabs";

export default function AtlasHeader({
                                        title = "ARCHIVE OF ANOMALIES",
                                        subtitle = "系统状态：在线",
                                        schoolName = "复旦大学",
                                        zones = [],
                                        activeZone,
                                        onZoneChange,
                                        syncText,
                                    }) {
    return (
        <header
            className="header-bar-muted p-4 pb-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-primary text-[10px] font-bold font-display uppercase mb-1 animate-pulse">
                        {subtitle}
                    </h2>
                    <h1 className="header-title text-3xl font-black">{title}</h1>
                </div>

                <div className="relative group">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 bg-surface-dark border border-white/10 hover:border-primary/50 transition-colors rounded pl-3 pr-2 py-1.5 h-auto"
                    >
                        <span className="header-title text-sm font-bold ">{schoolName}</span>
                        <span className="font-icon text-primary text-lg">arrow_drop_down</span>
                    </Button>
                </div>
            </div>

            <Tabs value={activeZone} onValueChange={onZoneChange}>
                <TabsList className="w-full bg-black/40 border border-white/5 h-auto p-1">
                    {zones.map((z) => (
                        <TabsTrigger
                            key={z}
                            value={z}
                            className="flex-1 py-2 px-1 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(255,0,85,0.4)] text-text-dim"
                        >
                            {z}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 header-subtitle opacity-80">
                <span className="font-icon text-[12px]">database</span>
                <span className="tracking-wide">{syncText}</span>
            </div>
        </header>
    );
}
