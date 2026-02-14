import BilingualText from "./BilingualText";

/**
 * 通用段落标题组件
 * 由图标 + 双语文字组成，常用于设置页面和个人档案页面的小节标题。
 *
 * @param {string} cn - 中文标题
 * @param {string} en - 英文标题（技术代号风格）
 * @param {string} icon - Material Symbols 图标名
 */
export default function SectionHeader({cn, en, icon}) {
    return (
        <div className="flex items-center gap-2 mb-3 px-1">
            <span className="font-icon text-primary text-sm">{icon}</span>
            <BilingualText cn={cn} en={en} className="text-xs font-bold"/>
        </div>
    );
}
