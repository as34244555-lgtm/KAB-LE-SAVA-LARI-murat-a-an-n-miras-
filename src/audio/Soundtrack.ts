import type { Palette } from "../managers/NarrativeManager";

/**
 * Dış dosya olmadan, Web Audio ile "hüzünlü ama kararlı" bir örtü üretir.
 * Seviye 40+ gölge, 100 reckoning tonuna kayar.
 */
export class Soundtrack {
  private ctx: AudioContext | null = null;
  private nodes: AudioNode[] = [];
  private running = false;
  private theme: Palette["music"] = "overture";

  async ensure(): Promise<void> {
    if (this.ctx) return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctx();
  }

  async setTheme(theme: Palette["music"]): Promise<void> {
    if (this.theme === theme && this.running) return;
    this.theme = theme;
    if (this.running) {
      this.stop();
      await this.play();
    }
  }

  async play(): Promise<void> {
    await this.ensure();
    if (!this.ctx || this.running) return;
    if (this.ctx.state === "suspended") await this.ctx.resume();
    this.running = true;
    const ctx = this.ctx;
    const master = ctx.createGain();
    master.gain.value = 0.045;
    master.connect(ctx.destination);

    const drones = voicing(this.theme);
    for (const freq of drones) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = freq > 180 ? "triangle" : "sine";
      osc.frequency.value = freq;
      gain.gain.value = freq > 180 ? 0.22 : 0.5;
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.08 + freq / 4000;
      lfoGain.gain.value = 4;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      lfo.start();
      this.nodes.push(osc, lfo, gain, lfoGain);
    }
    this.nodes.push(master);
  }

  stop(): void {
    for (const node of this.nodes) {
      if ("stop" in node && typeof node.stop === "function") {
        try {
          node.stop();
        } catch {
          /* already stopped */
        }
      }
      node.disconnect();
    }
    this.nodes = [];
    this.running = false;
  }
}

function voicing(theme: Palette["music"]): number[] {
  switch (theme) {
    case "overture":
      return [110, 164.8, 220];
    case "suspicion":
      return [98, 146.8, 196, 233];
    case "shadow":
      return [73.4, 110, 155.6, 185];
    case "reckoning":
      return [61.7, 92.5, 123.5, 185, 246.9];
  }
}
