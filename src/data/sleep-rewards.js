/**
 * 睡眠奖励数据模块
 * 生成随机的睡眠数据报告和解锁的异闻卡牌
 */

/**
 * 工具函数：生成 [min, max] 之间的随机整数
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 工具函数：生成 [min, max] 之间的随机浮点数，保留 decimals 位小数
 */
function randFloat(min, max, decimals = 1) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

/**
 * 根据总分返回评级字符
 */
function getGrade(score) {
    if (score >= 95) return "S+";
    if (score >= 90) return "S";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "D";
}

/**
 * 生成昨晚的随机睡眠报告数据
 */
export function generateSleepReport() {
    // 总睡眠时长（小时），5~9h 区间
    const totalHours = randFloat(5, 9, 1);
    const totalMin = Math.round(totalHours * 60);
    const hours = Math.floor(totalMin / 60);
    const mins = totalMin % 60;

    // 睡眠阶段占比（总计 100%）
    const deepPct = randInt(15, 30);   // 深睡
    const remPct = randInt(15, 25);    // REM
    const awakePct = randInt(2, 10);   // 清醒
    const lightPct = 100 - deepPct - remPct - awakePct; // 浅睡

    // 入睡延迟（分钟）
    const latency = randInt(5, 35);

    // 生理指标
    const heartRate = randInt(52, 72);       // 平均心率
    const breathRate = randInt(12, 18);      // 呼吸频率
    const bodyTemp = randFloat(36.0, 36.8);  // 体温

    // 综合评分
    const score = Math.min(100, Math.max(0,
        randInt(60, 98)
    ));
    const grade = getGrade(score);

    // 睡眠质量曲线（7 个采样点，模拟一晚上的深度变化）
    const qualityCurve = Array.from({length: 7}, () => randInt(20, 100));

    // AI 改善建议池
    const allTips = [
        "建议在睡前 1 小时减少蓝光设备使用，有助于提高褪黑素分泌。",
        "REM 阶段偏低，建议保持规律的作息时间以改善睡眠周期。",
        "深睡比例良好，继续保持白天适度运动有助于深层恢复。",
        "入睡延迟较长，可以尝试冥想或深呼吸练习来缩短入睡时间。",
        "体温波动在正常范围内，建议保持卧室温度在 18-22°C。",
        "心率偏高，建议避免睡前摄入咖啡因或进行剧烈运动。",
        "清醒次数较多，建议检查睡眠环境是否存在噪音或光线干扰。",
        "整体睡眠效率优秀，继续保持稳定的就寝和起床时间。",
        "浅睡占比偏高，建议增加有氧运动以促进深度睡眠。",
        "呼吸频率稳定，表明睡眠期间呼吸系统运转良好。",
    ];
    // 随机选 3 条不重复的建议
    const shuffled = [...allTips].sort(() => 0.5 - Math.random());
    const tips = shuffled.slice(0, 3);

    return {
        totalHours,
        duration: `${hours}h ${String(mins).padStart(2, "0")}m`,
        deepPct,
        lightPct,
        remPct,
        awakePct,
        latency,
        heartRate,
        breathRate,
        bodyTemp,
        score,
        grade,
        qualityCurve,
        tips,
    };
}

/**
 * 可通过睡眠解锁的异闻卡池
 * 这些卡牌不在常规图鉴中出现，需要通过睡眠奖励解锁
 */
const REWARD_CARDS = [
    {
        code: "SCP-FD-777",
        title: "午夜图书馆",
        zone: "光华楼区",
        coverUrl: "/images/atlas/cards/fd-082.png",
        description: "凌晨 3 点的图书馆里，总有人翻阅一本不存在的书。据目击者描述，书页上的文字会在阅读后自行消失，取而代之的是关于读者未来 24 小时的预言。",
    },
    {
        code: "SCP-FD-314",
        title: "逆行的时钟塔",
        zone: "南区",
        coverUrl: "/images/atlas/cards/fd-104.png",
        description: "每逢期末考试前夕，光华楼顶层的时钟会逆向转动。在此期间拍摄的照片中，所有人的影子都指向错误的方向。",
    },
    {
        code: "SCP-FD-520",
        title: "消失的第四食堂",
        zone: "南区",
        coverUrl: "/images/atlas/cards/fd-299.png",
        description: "「旦苑第四食堂」在校园地图上从未存在，但总有学生声称在那里吃过饭。唯一的线索是一张模糊的饭卡消费记录，显示交易地点为「???」。",
    },
    {
        code: "SCP-FD-666",
        title: "梦境漫游者",
        zone: "光华楼区",
        coverUrl: "/images/atlas/cards/fd-unknown.png",
        description: "一种仅在 REM 睡眠阶段出现的异常现象。受影响者会在梦中同步体验校园中真实发生的事件，且醒来后能复述精确的时间和地点。",
    },
    {
        code: "SCP-FD-128",
        title: "量子自习室",
        zone: "光华楼区",
        coverUrl: "/images/atlas/cards/fd-unknown-1.png",
        description: "H3108 教室在深夜无人时会进入「叠加态」——同时存在坐满人和完全空旷两种状态。任何试图确认的行为都会导致其坍缩为空旷状态。",
    },
];

/**
 * 随机返回一张奖励异闻卡
 */
export function getRandomRewardCard() {
    const idx = Math.floor(Math.random() * REWARD_CARDS.length);
    return {...REWARD_CARDS[idx]};
}
