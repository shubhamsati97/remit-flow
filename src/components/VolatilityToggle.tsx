import { useState } from "react";
import { TrendingDown, Eye, EyeOff } from "lucide-react";

interface VolatilityToggleProps {
  savings: number;
  localCode: string;
  localSymbol: string;
  volatilityPercent: number;
}

const VolatilityToggle = ({ savings, localCode, localSymbol, volatilityPercent }: VolatilityToggleProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="glass-card p-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center gap-2 w-full text-left"
      >
        <TrendingDown className="w-4 h-4 text-destructive" />
        <span className="text-xs font-medium text-muted-foreground flex-1">
          Hidden Cost of Volatility
        </span>
        {isVisible ? (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Eye className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isVisible && (
        <div className="mt-3 pt-3 border-t border-border/50 animate-fade-in-up">
          <p className="text-sm text-muted-foreground">
            By holding USDC instead of {localCode}, you saved:
          </p>
          <p className="text-xl font-bold text-primary mt-1">
            ${savings.toFixed(2)} USDC
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {localCode} dropped {Math.abs(volatilityPercent)}% in the last 30 days
          </p>
        </div>
      )}
    </div>
  );
};

export default VolatilityToggle;
