import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface BalanceCardProps {
  usdcBalance: number;
  localRate: number;
  localSymbol: string;
  localCode: string;
  volatility: number;
}

const BalanceCard = ({ usdcBalance, localRate, localSymbol, localCode, volatility }: BalanceCardProps) => {
  const localValue = usdcBalance * localRate;

  return (
    <div className="glass-card p-5">
      <p className="text-xs text-muted-foreground font-medium mb-1">Total Balance</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">${usdcBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        <span className="text-sm text-muted-foreground">USDC</span>
      </div>

      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
        <span className="text-sm text-muted-foreground">
          ≈ {localSymbol}{localValue.toLocaleString("en-US", { maximumFractionDigits: 0 })} {localCode}
        </span>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${volatility < 0 ? "text-destructive" : "text-primary"}`}>
          {volatility < 0 ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
          {Math.abs(volatility)}% (30d)
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;
