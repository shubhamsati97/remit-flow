import LiveStreamCard from "@/components/LiveStreamCard";
import BalanceCard from "@/components/BalanceCard";
import SafetyScore from "@/components/SafetyScore";
import VolatilityToggle from "@/components/VolatilityToggle";
import { useStreamCounter } from "@/hooks/useStreamCounter";
import {
  MOCK_BALANCE_USDC,
  LOCAL_CURRENCY,
  calculateSafetyScore,
  calculateVolatilitySavings,
} from "@/lib/mockData";

const Dashboard = () => {
  const { streamed, tickKey } = useStreamCounter(true);
  const totalWealth = MOCK_BALANCE_USDC + 500; // mock local holdings
  const safetyScore = calculateSafetyScore(MOCK_BALANCE_USDC, totalWealth);
  const savings = calculateVolatilitySavings(MOCK_BALANCE_USDC, LOCAL_CURRENCY.volatility30d);

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="text-xl font-bold text-foreground">RemitFlow</h1>
        </div>
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground">
          JD
        </div>
      </div>

      <LiveStreamCard streamed={streamed} tickKey={tickKey} isStreaming={true} />
      <BalanceCard
        usdcBalance={MOCK_BALANCE_USDC}
        localRate={LOCAL_CURRENCY.rate}
        localSymbol={LOCAL_CURRENCY.symbol}
        localCode={LOCAL_CURRENCY.code}
        volatility={LOCAL_CURRENCY.volatility30d}
      />

      <div className="grid grid-cols-1 gap-4">
        <SafetyScore score={safetyScore} />
        <VolatilityToggle
          savings={savings}
          localCode={LOCAL_CURRENCY.code}
          localSymbol={LOCAL_CURRENCY.symbol}
          volatilityPercent={LOCAL_CURRENCY.volatility30d}
        />
      </div>
    </div>
  );
};

export default Dashboard;
