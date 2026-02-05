import {useNavigate} from "react-router-dom";

export default function Header({
                                   title = "?",
                                   subtitle = "?",
                                   icon = "arrow_back",
                                   iconText = "?",
                                   additionalClass = "",
                                   rightText = "",
                               }) {
    const navigate = useNavigate();
    return (
        <header
            className="header-bar header-bar-muted sticky top-0 p-2 z-20 ml-1 gap-3">
            <button
                onClick={() => navigate(-1)}
                className="btn-base btn-ghost w-20 h-10"
            >
                <span className="font-icon text-xl">{icon}</span>
                <span className="text tracking-widest whitespace-nowrap">{iconText}</span>
            </button>
            <div>
                <h1 className={`header-title text-xl leading-none ${additionalClass}`} data-text={title}>{title}</h1>
                <h2 className="header-subtitle text-primary font-bold animate-pulse">
                    {subtitle}
                </h2>
                {/*<h1 className="text-xl font-display font-bold tracking-widest text-white">SYSTEM_CONFIG</h1>*/}
                {/*<p className="text-xxs text-text-dim tracking-widest"></p>*/}
            </div>
            {rightText?.trim() && (<div className="ml-auto flex items-center mr-2 gap-2 text-primary">
                <span className="animate-pulse w-2 h-2 rounded-full bg-primary"/>
                <span className="text-xs font-mono">{rightText}</span>
            </div>)}
        </header>);
}
