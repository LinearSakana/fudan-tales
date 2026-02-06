// 轻量 WebAudio 引擎：用于 Demo 的声景试听，后续可替换为真实音频素材播放器。
export function createWebAudioEngine() {
    let audioContext = null;
    let masterGain = null;
    let channels = null;

    const supportsWebAudio =
        typeof window !== "undefined" &&
        (window.AudioContext || window.webkitAudioContext);

    function ensureContext() {
        if (!supportsWebAudio) return null;
        if (audioContext) return audioContext;

        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioContext = new Ctx();
        masterGain = audioContext.createGain();
        masterGain.gain.value = 0.45;
        masterGain.connect(audioContext.destination);
        return audioContext;
    }

    function createLoopNoise(ctx) {
        const duration = 2;
        const frameCount = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < frameCount; i += 1) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        return source;
    }

    function normalize(levels, key) {
        const raw = Number(levels?.[key] ?? 0);
        return Math.max(0, Math.min(1, raw / 100));
    }

    function buildGraph(levels) {
        const ctx = ensureContext();
        if (!ctx || !masterGain) return;

        const rainSource = createLoopNoise(ctx);
        const rainFilter = ctx.createBiquadFilter();
        rainFilter.type = "bandpass";
        rainFilter.frequency.value = 820;
        rainFilter.Q.value = 0.8;
        const rainGain = ctx.createGain();
        rainGain.gain.value = normalize(levels, "rain") * 0.36;
        rainSource.connect(rainFilter);
        rainFilter.connect(rainGain);
        rainGain.connect(masterGain);

        const whiteSource = createLoopNoise(ctx);
        const whiteGain = ctx.createGain();
        whiteGain.gain.value = normalize(levels, "whiteNoise") * 0.2;
        whiteSource.connect(whiteGain);
        whiteGain.connect(masterGain);

        const humOsc = ctx.createOscillator();
        humOsc.type = "sine";
        humOsc.frequency.value = 68;
        const humLfo = ctx.createOscillator();
        humLfo.type = "sine";
        humLfo.frequency.value = 0.12;
        const humLfoGain = ctx.createGain();
        humLfoGain.gain.value = 7;
        humLfo.connect(humLfoGain);
        humLfoGain.connect(humOsc.frequency);
        const humGain = ctx.createGain();
        humGain.gain.value = normalize(levels, "hum") * 0.16;
        humOsc.connect(humGain);
        humGain.connect(masterGain);

        channels = {
            rain: {source: rainSource, gain: rainGain},
            whiteNoise: {source: whiteSource, gain: whiteGain},
            hum: {source: humOsc, gain: humGain},
            humLfo,
        };

        rainSource.start();
        whiteSource.start();
        humOsc.start();
        humLfo.start();
    }

    async function init() {
        const ctx = ensureContext();
        if (!ctx) return false;
        if (ctx.state === "suspended") {
            await ctx.resume();
        }
        return true;
    }

    async function play(levels) {
        const ready = await init();
        if (!ready) return false;
        if (channels) return true;

        buildGraph(levels);
        return true;
    }

    function update(levels) {
        if (!channels || !audioContext) return;

        const now = audioContext.currentTime;
        channels.rain.gain.gain.setTargetAtTime(normalize(levels, "rain") * 0.36, now, 0.18);
        channels.whiteNoise.gain.gain.setTargetAtTime(normalize(levels, "whiteNoise") * 0.2, now, 0.18);
        channels.hum.gain.gain.setTargetAtTime(normalize(levels, "hum") * 0.16, now, 0.18);
    }

    function stop() {
        if (!channels) return;

        channels.rain.source.stop();
        channels.whiteNoise.source.stop();
        channels.hum.source.stop();
        channels.humLfo.stop();
        channels = null;
    }

    function dispose() {
        stop();
        if (audioContext) {
            audioContext.close();
            audioContext = null;
            masterGain = null;
        }
    }

    return {
        supportsWebAudio,
        init,
        play,
        update,
        stop,
        dispose,
    };
}
