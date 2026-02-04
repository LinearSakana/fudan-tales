export const currentUser = {
    name: "DREAMER-049",
    id: "049",
    alias: "CHRONO_WATCHER",
    department: "???学院 · 异常行为观测科",
    level: 18,
    sanity: 82,
    totalSyncHours: 142.5,
    stats: {
        efficiency: {val: "94.2%", trend: "+1.2%", status: "opt"}, // 神经效能
        stability: {val: "CLASS-A", trend: "STABLE", status: "norm"}, // 波形稳定性
        latency: {val: "12ms", trend: "-4ms", status: "opt"},     // 延迟
        coherence: {val: "88%", trend: "WARN", status: "warn"}    // REM 一致性
    }
};

// 融合版图表数据：包含时长(height)和状态(color)
export const syncLog = [
    {day: "MON", hours: 6.2, status: "UNSTABLE"},
    {day: "TUE", hours: 5.0, status: "CRITICAL"},
    {day: "WED", hours: 7.5, status: "STABLE"},
    {day: "THU", hours: 8.8, status: "OPTIMAL"},
    {day: "FRI", hours: 6.5, status: "STABLE"},
    {day: "SAT", hours: 9.2, status: "OPTIMAL"},
    {day: "SUN", hours: 7.1, status: "STABLE"},
];

// 融合版勋章：记忆印痕 (Engrams)
// 结合了 V1 的进度条逻辑和 V2 的稀有度/特效逻辑
export const engrams = [
    {
        id: "E01",
        name: "晨曦行者",
        desc: "连续 5 天在 08:00 前完成校准",
        rarity: "common",    // common, rare, epic, legendary
        status: "unlocked",  // unlocked, locked, parsing
        progress: 100,
        icon: "wb_twilight"
    },
    {
        id: "E02",
        name: "深渊潜航",
        desc: "单次深度睡眠占比 > 40%",
        rarity: "rare",
        status: "unlocked",
        progress: 100,
        icon: "scuba_diving"
    },
    {
        id: "E03",
        name: "光华守望",
        desc: "累计校准时长达到 200 小时",
        rarity: "epic",
        status: "parsing",   // 解析中 (进行中)
        progress: 71,
        icon: "apartment"
    },
    {
        id: "E04",
        name: "时空悖论",
        desc: "在同一天内触发两次异闻修正",
        rarity: "legendary",
        status: "locked",
        progress: 0,
        icon: "all_inclusive"
    }
];