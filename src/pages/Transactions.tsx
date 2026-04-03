import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/mockData";

const formatTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
};

const Transactions = () => {
  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-4">Transactions</h1>

      <div className="space-y-2">
        {MOCK_TRANSACTIONS.map((tx, i) => (
          <div
            key={tx.id}
            className="glass-card p-4 flex items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
              tx.type === "stream" ? "bg-primary/15" : "bg-secondary/15"
            }`}>
              <ArrowUpRight className={`w-4 h-4 ${tx.type === "stream" ? "text-primary" : "text-secondary"}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-foreground truncate">
                  {tx.type === "stream" ? "Streamed" : "Top Up"} → {tx.destination}
                </p>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground">
                {formatTime(tx.timestamp)} · 1 USDC = {tx.exchangeRate.toLocaleString()} ARS
              </p>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-foreground">
                {tx.type === "stream" ? "-" : "+"}{tx.amount} USDC
              </p>
              <p className="text-xs text-muted-foreground">
                AR${tx.localAmount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
