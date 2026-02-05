import React from 'react';

const BroadcastTicker = ({messages}) => {
    return (
        <div
            className="w-full bg-black/60 border-y border-white/10 h-8 flex items-center overflow-hidden relative backdrop-blur-sm">
            <div
                className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background-dark to-transparent z-10"/>
            <div
                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background-dark to-transparent z-10"/>

            <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
                {messages.map((msg, idx) => (
                    <span key={idx}
                          className="text-[10px] font-mono text-primary/80 tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"/>
                        [{msg}]
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BroadcastTicker;