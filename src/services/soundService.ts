export type SoundName = 'click' | 'success' | 'pop' | 'transition' | 'tap';

const sounds: Record<SoundName, string> = {
  click: 'https://assets.mixkit.co/sfx/preview/mixkit-simple-click-630.mp3',
  success: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
  pop: 'https://assets.mixkit.co/sfx/preview/mixkit-pop-down-2356.mp3',
  transition: 'https://assets.mixkit.co/sfx/preview/mixkit-interface-hint-notification-911.mp3',
  tap: 'https://assets.mixkit.co/sfx/preview/mixkit-selection-click-1109.mp3'
};

class SoundService {
  private audioContext: AudioContext | null = null;
  private buffers: Map<string, AudioBuffer> = new Map();

  constructor() {
    // AudioContext is initialized on first interaction to comply with browser policies
  }

  private async initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  async preload() {
    await this.initContext();
    const loadPromises = Object.entries(sounds).map(async ([name, url]) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
        this.buffers.set(name, audioBuffer);
      } catch (error) {
        // Silently fail if sounds can't be loaded to avoid console spam
        // The play() method will attempt a direct Audio() fallback
      }
    });
    await Promise.all(loadPromises);
  }

  play(name: SoundName) {
    this.initContext().then(() => {
      const buffer = this.buffers.get(name);
      if (buffer && this.audioContext) {
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
      }
      // Removed unreliable new Audio() fallback that was causing "no supported source" errors
    });
  }
}

export const soundService = new SoundService();
