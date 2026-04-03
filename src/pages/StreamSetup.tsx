import { useState } from "react";
import { Zap, Check } from "lucide-react";

const FREQUENCIES = ["Daily", "Weekly", "Real-time"] as const;
const DESTINATIONS = ["Home Wallet", "Savings"] as const;

const StreamSetup = () => {
  const [percentage, setPercentage] = useState(50);
  const [frequency, setFrequency] = useState<typeof FREQUENCIES[number]>("Real-time");
  const [destination, setDestination] = useState<typeof DESTINATIONS[number]>("Home Wallet");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Stream Setup</h1>
        <p className="text-sm text-muted-foreground mt-1">Set it and forget it — auto-convert your earnings to USDC.</p>
      </div>

      {/* Percentage Slider */}
      <div className="glass-card p-5 space-y-4">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Auto-Convert Percentage
        </label>
        <div className="text-center">
          <span className="text-4xl font-bold text-gradient-green">{percentage}%</span>
          <p className="text-xs text-muted-foreground mt-1">of incoming earnings</p>
        </div>
        <input
          type="range"
          min={10}
          max={90}
          step={5}
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-primary/30 [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>10%</span><span>50%</span><span>90%</span>
        </div>
      </div>

      {/* Destination */}
      <div className="glass-card p-5 space-y-3">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Destination
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DESTINATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDestination(d)}
              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                destination === d
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-muted/50 text-muted-foreground border border-transparent hover:border-border"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="glass-card p-5 space-y-3">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Frequency
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                frequency === f
                  ? "bg-secondary/15 text-secondary border border-secondary/30"
                  : "bg-muted/50 text-muted-foreground border border-transparent hover:border-border"
              }`}
            >
              {f === "Real-time" && <Zap className="w-3 h-3 inline mr-1" />}
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
          saved
            ? "bg-primary/20 text-primary"
            : "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
        }`}
      >
        {saved ? (
          <span className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Stream Updated
          </span>
        ) : (
          "Save Stream Settings"
        )}
      </button>
    </div>
  );
};

export default StreamSetup;
