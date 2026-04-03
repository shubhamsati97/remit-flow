import { Zap } from "lucide-react";

interface LiveStreamCardProps {
  streamed: number;
  tickKey: number;
  isStreaming: boolean;
}

const LiveStreamCard = ({ streamed, tickKey, isStreaming }: LiveStreamCardProps) => {
  return (
    <div className="glass-card glow-green p-5 relative overflow-hidden">
      {/* Animated background pulse */}
      {isStreaming && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent animate-stream-pulse" />
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Live Stream
          </span>
          <Zap className="w-3.5 h-3.5 text-primary" />
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gradient-green tabular-nums" key={tickKey}>
            {streamed.toFixed(4)}
          </span>
          <span className="text-sm font-medium text-muted-foreground">USDC</span>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Streaming to Home Wallet · $0.0023/sec
        </p>
      </div>
    </div>
  );
};

export default LiveStreamCard;
