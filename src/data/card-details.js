/**
 * 异闻图鉴·条目详情数据
 * key 为 entity.code（如 "SCP-FD-082"），值包含档案信息、解密提示、照片数据和补给信息。
 * 未配置的字段会自动使用 defaultDetail 中的默认值。
 */

export const detailsByCode = {
    "SCP-FD-082": {
        archiveNo: "档案编号 24-10-X", // 顶栏 glitch 文案；不写则用默认 derive
        protocol: "绝密", // 顶栏左侧；可选
        connectionText: "连接中", // 顶栏右侧；可选

        decrypt: {
            hint: " 正在解析 REM 睡眠数据... 完成。", // 进度条下那行
        },

        photo: {
            tag: "#本部_西门",
            meta: "07:12 AM >> 阴",
            warning:
                "警告：不存在的实体。检测到现实扭曲场残留。该异常已被相关部门控制并清除。",
            // 可选：给照片单独一张图（不写则用 entity.coverUrl）
        },

        supply: {
            title: "南区深夜食堂",
            discountNum: "10%",
            item: "兑换物：铁板炒饭 (B级)",
            icon: "restaurant", // Material Symbols 名称
        },
    },

    "SCP-FD-104": {
        archiveNo: "档案编号 24-11-C",
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

// 可选：统一默认值，防止漏配
export const defaultDetail = {
    protocol: "绝密",
    connectionText: "连接中",
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
