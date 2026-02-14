import {Card} from "./ui/card";
import {Badge} from "./ui/badge";
import {Progress} from "./ui/progress";

export default function EntityCard({
                                       code,
                                       title,
                                       coverUrl,
                                       status = "contained", // "contained" | "analyzing"
                                       progress = 1, // 0~1
                                       onClick,
                                   }) {
    const isAnalyzing = status === "analyzing";

    const badgeLabel = isAnalyzing ? "解析中" : "已收容";
    const badgeDotClass = isAnalyzing ? "bg-yellow-500" : "bg-primary";

    const clamped = Math.max(0, Math.min(1, progress));

    return (
        <Card
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => {
                if (!onClick) return;
                if (e.key === "Enter") onClick();
            }}
            className={[
                "relative overflow-hidden group",
                onClick ? "cursor-pointer" : "",
            ].join(" ")}>
            {/* 状态徽章 */}
            <Badge
                variant={isAnalyzing ? "warning" : "default"}
                className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/60 backdrop-blur">
                <div className={["w-1.5 h-1.5 rounded-full animate-pulse", badgeDotClass].join(" ")}/>
                <span className="text-[9px] font-bold">{badgeLabel}</span>
            </Badge>

            {/* 封面图 */}
            <div
                className="aspect-[4/5] w-full bg-cover bg-center relative"
                style={{backgroundImage: `url("${coverUrl}")`}}
            >
                <div
                    className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"/>
                <div
                    className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"/>
            </div>

            {/* 底部信息 */}
            <div className="absolute bottom-0 left-0 w-full p-3">
                <p className="text-[10px] text-primary font-mono mb-0.5 tracking-wider">{code}</p>
                <h3 className="text-white text-sm font-bold leading-tight">{title}</h3>

                <Progress
                    value={clamped * 100}
                    className="h-1 mt-2"
                    indicatorClassName={isAnalyzing ? "bg-yellow-500" : undefined}
                />
            </div>
        </Card>
    );
}
