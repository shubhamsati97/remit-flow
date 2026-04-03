import { useState, useEffect, useCallback } from "react";

export const useStreamCounter = (isStreaming: boolean, ratePerSecond = 0.0023) => {
  const [streamed, setStreamed] = useState(142.847);
  const [tickKey, setTickKey] = useState(0);

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setStreamed((prev) => {
        const next = prev + ratePerSecond;
        return Math.round(next * 10000) / 10000;
      });
      setTickKey((k) => k + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isStreaming, ratePerSecond]);

  const reset = useCallback(() => setStreamed(0), []);

  return { streamed, tickKey, reset };
};
