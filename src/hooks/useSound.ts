import { useCallback, useEffect, useRef } from 'react';

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  // iOS/Android: AudioContext starts in "suspended" state until a user gesture
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

export const useSound = (url: string) => {
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => getAudioContext().decodeAudioData(arrayBuffer))
      .then((decoded) => {
        if (!cancelled) bufferRef.current = decoded;
      })
      .catch((err) => console.warn('Audio load failed:', err));

    return () => { cancelled = true; };
  }, [url]);

  const playSound = useCallback(() => {
    const buffer = bufferRef.current;
    if (!buffer) return;

    const ctx = getAudioContext();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  }, []);

  return playSound;
};
