export default function LayoutEffects({
                                          noise = "soft",
                                          scanlines = true,
                                          glow = false,
                                          vignette = false,
                                          grid = false,
                                      }) {
    const noiseOpacity = noise === "strong" ? "opacity-30" : "opacity-20";

    return (
        <>
            <div className={`absolute inset-0 effect-noise ${noiseOpacity}`}/>
            {scanlines && (
                <div className="absolute inset-0">
                    {/* 呼吸效果背景 */}
                    <div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,85,0.05)_0%,transparent_70%)]"></div>
                    {/*<div*/}
                    {/*    className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,85,0.05)_10px,rgba(255,0,85,0.05)_20px)]"></div>*/}
                    <div
                        className="absolute inset-0 effect-scanlines"></div>
                    {/* 模糊效果 */}
                    <div className="absolute inset-0 blur-xl bg-primary-dark/10 -z-10"></div>
                </div>
            )}
            {glow && <div className="absolute top-0 right-0 w-64 h-64 effect-glow"/>}
            {vignette && <div className="absolute inset-0 effect-vignette"/>}
            {grid && <div className="fixed inset-0 effect-grid"/>}
        </>
    );
}
