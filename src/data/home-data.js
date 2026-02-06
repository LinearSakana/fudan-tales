export const broadcastMessages = [
    "SYSTEM_ALERT: Reality fluctuations detected in Sector 4...",
    "INTERCEPTED: 'Don't look at the cat in the mirror'...",
    "REMINDER: Daily neural sync required before 23:00...",
    "WEATHER: Heavy data rain expected in Guanghua Tower area..."
];

// 模拟 Feed 流数据
export const feedItems = [
    {
        id: 1,
        type: 'entity',
        code: 'SCP-FD-03',
        title: '3108的永恒自习者',
        coverUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000&auto=format&fit=crop',
        status: 'contained',
        progress: 1
    },
    {
        id: 2,
        type: 'locked', // 未解锁内容
        requiredLevel: 5,
        coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 3,
        type: 'entity',
        code: 'SCP-FD-09',
        title: '猫咪地下网络',
        coverUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop',
        status: 'analyzing', // 正在解析
        progress: 0.7
    }
];

export const quickActions = [
    {icon: 'map', label: '区域地图', sub: 'ATLAS'},
    {icon: 'history', label: '回溯记录', sub: 'LOGS'},
    {icon: 'warning', label: '当前告警', sub: 'ALERTS'},
    {icon: 'qr_code_scanner', label: '现实扫描', sub: 'SCAN'}
];
// 声景预设：后续可以替换成服务端配置或用户自定义方案。
export const soundPresets = [
    {
        id: "library-rain",
        name: "Library Rain",
        description: "像深夜图书馆窗边的小雨，适合睡前放空。",
        channelDefaults: {rain: 62, whiteNoise: 45, hum: 20}
    },
    {
        id: "dorm-quiet",
        name: "Dorm Quiet",
        description: "更克制的白噪比例，降低宿舍环境的干扰感。",
        channelDefaults: {rain: 28, whiteNoise: 58, hum: 16}
    },
    {
        id: "night-walk",
        name: "Night Walk",
        description: "带一点低频氛围，模拟夜间散步后的沉静状态。",
        channelDefaults: {rain: 36, whiteNoise: 32, hum: 48}
    }
];

export const soundChannels = [
    {id: "rain", label: "雨声层 Rain", min: 0, max: 100, step: 1, defaultValue: 50},
    {id: "whiteNoise", label: "白噪层 White Noise", min: 0, max: 100, step: 1, defaultValue: 40},
    {id: "hum", label: "低频层 Low Hum", min: 0, max: 100, step: 1, defaultValue: 20},
];

export const fixedQuestTemplates = [
    {id: "wake-on-time", title: "07:20 前起床", subtitle: "稳定晨间节律，减少醒后拖延。"},
    {id: "sunlight-10", title: "晨光暴露 10 分钟", subtitle: "出门接触自然光，提升白天清醒度。"},
];

export const randomQuestPool = [
    {id: "no-short-video", title: "23:00 后不刷短视频", subtitle: "降低高唤醒内容对入睡的干扰。"},
    {id: "no-late-coffee", title: "17:00 后不喝咖啡因", subtitle: "给夜间睡意留出更稳定的窗口。"},
    {id: "cooldown-ritual", title: "睡前 20 分钟降噪仪式", subtitle: "仅保留低刺激内容，准备入睡。"},
    {id: "no-long-nap", title: "午睡不超过 25 分钟", subtitle: "防止夜间睡意被白天透支。"},
];
