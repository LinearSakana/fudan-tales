/**
 * 异闻图鉴·条目详情数据
 * key 为 entity.code（如 "SCP-FD-082"），值包含档案信息、解密提示、照片数据和补给信息。
 * 未配置的字段会自动使用 defaultDetail 中的默认值。
 */

export const detailsByCode = {
    "SCP-FD-082": {
        archiveNo: "档案编号 24-10-X",
        protocol: "绝密",
        connectionText: "连接中",

        dangerLevel: 3,
        description:
            "首次报告于 2024 年 10 月，复旦大学光华楼西门附近。多名目击者声称发现一只橘白相间的流浪猫在监控盲区反复出现和消失。对该区域进行排查后，确认该实体具有轻度现实扭曲能力，能同时处于「存在」与「不存在」的叠加态。",
        containment:
            "该实体目前由校内志愿者以日常投喂为掩护进行持续监控。所有监控数据实时回传至驻站分析终端。任何试图用量子观测装置锁定其位置的尝试均告失败。建议维持现状，不主动干预。",
        timeline: [
            {date: "2024.10.03", event: "光华楼西门保安首次目击"},
            {date: "2024.10.08", event: "监控录像中出现叠影现象"},
            {date: "2024.10.15", event: "外勤小组部署追踪信标"},
            {date: "2024.10.22", event: "信标数据异常，同时出现于 3 个位置"},
            {date: "2024.11.01", event: "正式归类为 SCP-FD-082，等级 Euclid"},
        ],

        decrypt: {
            hint: " 正在解析 REM 睡眠数据... 完成。",
        },

        photo: {
            tag: "#本部_西门",
            meta: "07:12 AM >> 阴",
            warning:
                "警告：不存在的实体。检测到现实扭曲场残留。该异常已被相关部门控制并清除。",
        },

        supply: {
            title: "南区深夜食堂",
            discountNum: "10%",
            item: "兑换物：铁板炒饭 (B级)",
            icon: "restaurant",
        },
    },

    "SCP-FD-104": {
        archiveNo: "档案编号 24-11-C",
        dangerLevel: 2,
        description:
            "理科图书馆三层阅览区自习位上，一杯美式咖啡在无人干预的情况下持续保持满杯状态。初步分析表明该液体具备自增殖特性：每当液面降低至 50% 以下时，会在 3 分钟内恢复至初始液位。液体成分与普通咖啡无异，但咖啡因浓度显著高于正常值。",
        containment:
            "已将该容器密封于标准 B 级异常物品保管箱中，置于阅览区 307 号自习位下方。每周进行一次容量测量和成分采样。禁止任何人员饮用该液体。曾有一名研究员违规品尝后连续 72 小时无法入睡。",
        timeline: [
            {date: "2024.11.02", event: "图书馆保洁人员发现异常咖啡杯"},
            {date: "2024.11.05", event: "成分检测报告：咖啡因浓度超标 340%"},
            {date: "2024.11.10", event: "确认液体自增殖特性"},
            {date: "2024.11.18", event: "研究员违规品尝事件 (已处理)"},
            {date: "2024.11.25", event: "升级为 Safe 等级，持续监控中"},
        ],

        decrypt: {hint: " 正在扫描咖啡因残留... 完成。"},
        photo: {
            tag: "#理科_图书馆",
            meta: "11:30 PM >> 小雨",
            warning: "警告：检测到自增殖液体。请勿在封闭空间开启容器。",
        },
        supply: {
            title: "学理咖啡",
            discountNum: "20%",
            item: "兑换物：美式咖啡 (A级)",
            icon: "local_cafe",
        },
    },

    "SCP-FD-299": {
        archiveNo: "档案编号 24-12-R",
        dangerLevel: 4,
        description:
            "H3108 教室在期末考试季期间会产生异常声学现象，表现为低频嗡鸣和不规则的笔尖摩擦声。该噪声无法被常规录音设备捕获，但所有在场人员均能感知。暴露于该噪声超过 2 小时的学生报告出现'记忆回响'——即在梦境中反复复习考试内容的现象。",
        containment:
            "期末考试期间对 H3108 教室实施 23:00 - 05:00 封锁。异常活动窗口外可正常使用。已在教室四角部署 4 台白噪声发生器用于压制低频嗡鸣。所有在该教室通宵自习的学生将被秘密纳入心理健康监测名单。",
        timeline: [
            {date: "2024.12.01", event: "多名学生报告 H3108 出现异声"},
            {date: "2024.12.05", event: "声学分析确认非自然声源"},
            {date: "2024.12.10", event: "首例梦境侵入报告"},
            {date: "2024.12.15", event: "部署白噪声压制装置"},
            {date: "2024.12.20", event: "归类为 Euclid，启动长期监控"},
        ],

        decrypt: {hint: " 正在匹配考场噪声指纹... 完成。"},
        photo: {
            tag: "#H3108_教室",
            meta: "02:10 AM >> 多云",
            warning: "警告：疑似存在记忆回响。连续暴露可能导致梦境侵入。",
        },
        supply: {
            title: "夜读自习室",
            discountNum: "40%",
            item: "兑换物：热牛奶 (B级)",
            icon: "menu_book",
        },
    },
};

// 统一默认值，防止漏配
export const defaultDetail = {
    protocol: "绝密",
    connectionText: "连接中",
    dangerLevel: 1,
    description: "档案描述暂未解锁。需要更高的解密等级才能访问完整信息。",
    containment: "收容措施信息受限。请联系上级获取授权。",
    timeline: [{date: "????", event: "信息碎片尚未拼合"}],
    decrypt: {hint: " 正在解析 REM 睡眠数据... 完成。"},
    photo: {
        tag: "#复旦_未知区域",
        meta: "??:?? >> 未知",
        warning: "警告：检测到异常信号残留。请勿靠近。",
    },
    supply: {
        typeLabelCn: "特别补给",
        typeLabelEn: "SPECIAL SUPPLY",
        title: "未知补给点",
        discountNum: "?",
        discountUnit: "off",
        item: "兑换物：未知",
        icon: "qr_code_2",
    },
};
