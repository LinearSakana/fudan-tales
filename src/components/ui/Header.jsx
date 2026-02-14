import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";

/**
 * 页面通用头部组件 — 包含返回按钮、标题和可选的右侧状态文本
 * 使用 shadcn/ui Button 替代原始按钮样式
 */
export default function Header({
                                   title = "?",
                                   subtitle = "?",
                                   icon = "arrow_back",
                                   iconText = "返回",
                                   additionalClass = "",
                                   rightText = "",
                                   onIconClick,
                               }) {
    const navigate = useNavigate();
    onIconClick = () => navigate(-1);
    return (
        <header
            className="header-bar header-bar-muted sticky top-0 p-2 z-20 ml-1 gap-3">
            <Button
                variant="ghost"
                onClick={() => onIconClick()}
                className="w-20 h-10 gap-1 text-xs font-bold tracking-widest"
            >
                <span className="font-icon text-xl">{icon}</span>
                <span className="tracking-widest whitespace-nowrap">{iconText}</span>
            </Button>
            <div>
                <h1 className={`header-title text-xl leading-none ${additionalClass}`} data-text={title}>{title}</h1>
                <h2 className="header-subtitle text-primary font-bold animate-pulse">
                    {subtitle}
                </h2>
            </div>
            {rightText?.trim() && (<div className="ml-auto flex items-center mr-2 gap-2 text-primary">
                <span className="animate-pulse w-2 h-2 rounded-full bg-primary"/>
                <span className="text-xs font-mono">{rightText}</span>
            </div>)}
        </header>);
}
