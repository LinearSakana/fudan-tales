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