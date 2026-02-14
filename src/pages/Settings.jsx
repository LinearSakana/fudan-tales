import React, {useEffect, useState} from "react";
import LayoutEffects from "../components/layout/LayoutEffects";
import BilingualText from "../components/ui/BilingualText";
import ToggleItem from "../components/ui/ToggleItem";
import ActionButton from "../components/ui/ActionButton";
import Header from "../components/ui/Header";
import {Slider} from "../components/ui/slider";
import {Button} from "../components/ui/button";
import {Card, CardContent} from "../components/ui/card";
import {Separator} from "../components/ui/separator";
import {currentUser} from "../data/user-data";

export default function Settings() {
    const [booted, setBooted] = useState(false);

    // 模拟设置状态
    const [config, setConfig] = useState({
        hudEffects: true,
        hapticFeedback: true,
        autoSync: false,
        stealthMode: false,
        brightness: 75,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setBooted(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const toggleConfig = (key) => {
        setConfig(prev => ({...prev, [key]: !prev[key]}));
    };

    return (
        <div className="layout-page layout-frame font-mono">
            <LayoutEffects noise="soft" scanlines={config.hudEffects}/>

            <Header title={""} subtitle={""} icon="arrow_back" iconText={"返回"}
                    additionalClass={"glitch-text tracking-wide"} rightText={`TERMINAL ID: ${currentUser.id}`}/>

            <main
                className={`flex-1 overflow-y-auto p-5 space-y-8 pb-32 transition-all duration-500 ${booted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* --- Section 1: HUD & Display --- */}
                <section>
                    <SectionHeader cn="显示接口" en="VISOR_DISPLAY" icon="visibility"/>

                    <Card className="p-4 space-y-5">
                        <ToggleItem
                            label="HUD_SCANLINES"
                            desc="视觉皮层扫描线特效"
                            active={config.hudEffects}
                            onClick={() => toggleConfig('hudEffects')}
                        />
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-text-dim">
                                <span>RETINA_BRIGHTNESS</span>
                                <span>{config.brightness}%</span>
                            </div>
                            <Slider
                                min={0} max={100} step={1}
                                value={[config.brightness]}
                                onValueChange={([val]) => setConfig({...config, brightness: val})}
                            />
                        </div>
                    </Card>
                </section>

                {/* --- Section 2: Neural Link --- */}
                <section>
                    <SectionHeader cn="神经链接" en="NEURAL_LINK" icon="settings_input_antenna"/>

                    <Card className="bg-card/60 p-4 space-y-5">
                        <ToggleItem
                            label="HAPTIC_FEEDBACK"
                            desc="操作时触发突触反馈"
                            active={config.hapticFeedback}
                            onClick={() => toggleConfig('hapticFeedback')}
                        />
                        <ToggleItem
                            label="AUTO_SYNC_UPLOAD"
                            desc="休眠周期自动上传日志"
                            active={config.autoSync}
                            onClick={() => toggleConfig('autoSync')}
                        />
                    </Card>
                </section>

                {/* --- Section 3: Privacy & Protocol --- */}
                <section>
                    <SectionHeader cn="安全协议" en="SECURITY_PROTOCOL" icon="security"/>

                    <Card className="bg-card/60 p-4 space-y-4">
                        <ToggleItem
                            label={
                                <BilingualText cn={"深色模式"} en={"STEALTH-MODE"} className="text-xs font-bold"/>
                            }
                            desc="对未授权终端隐藏在线状态"
                            active={config.stealthMode}
                            onClick={() => toggleConfig('stealthMode')}
                            color="cyan"
                        />

                        <Separator className="border-dashed"/>

                        <div className="grid grid-cols-2 gap-3">
                            <ActionButton label="清除本地缓存" sub="PURGE CACHE" icon="delete_sweep" iconSize="text-6xl"
                                          iconPosition="-top-0 -right-0"/>
                            <ActionButton label="神经校准" sub="RE-CALIBRATE" icon="tune" iconSize="text-6xl"
                                          iconPosition="-top-0 -right-0"/>
                        </div>
                    </Card>
                </section>

                {/* --- Danger Zone --- */}
                <Button
                    variant="destructive"
                    className="w-full group relative overflow-hidden border border-red-900/50 bg-red-900/10 hover:bg-red-900/30 text-red-500 py-3 mt-8 h-auto rounded-md">
                    <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"/>
                    <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-widest">
                        <span className="font-icon">power_settings_new</span>
                        SEVER_CONNECTION
                     </span>
                </Button>
                <p className="text-center text-nano text-white/10 font-mono mt-2">v.2.0.45-BETA // FUDAN_TALES</p>

            </main>
        </div>
    );
}

// ------ Sub Components ------

function SectionHeader({cn, en, icon}) {
    return (
        <div className="flex items-center gap-2 mb-3 px-1">
            <span className="font-icon text-primary text-sm">{icon}</span>
            <BilingualText cn={cn} en={en} className="text-xs font-bold"/>
        </div>
    );
}

