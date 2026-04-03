import { Copy, ExternalLink, CreditCard } from "lucide-react";
import { MOCK_BALANCE_USDC } from "@/lib/mockData";
import { toast } from "sonner";

const WalletPage = () => {
  const mockAddress = "0x7a3F...b9E2";

  const copyAddress = () => {
    navigator.clipboard.writeText("0x7a3F4c8D1e9B2a5F6c0D3e7A8b1C4d5E6f7a8B9E2");
    toast.success("Address copied!");
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto space-y-4">
      <h1 className="text-xl font-bold text-foreground">Wallet</h1>

      {/* Main Balance */}
      <div className="glass-card glow-blue p-6 text-center">
        <p className="text-xs text-muted-foreground font-medium mb-1">Available Balance</p>
        <p className="text-3xl font-bold text-foreground">
          ${MOCK_BALANCE_USDC.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-muted-foreground mt-1">USDC</p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={copyAddress}
            className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg hover:text-foreground transition-colors"
          >
            <Copy className="w-3 h-3" />
            {mockAddress}
          </button>
          <button className="text-xs text-muted-foreground bg-muted/50 px-2 py-1.5 rounded-lg hover:text-foreground transition-colors">
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Crossmint Top Up Placeholder */}
      <div className="glass-card p-5 border-dashed border-secondary/30">
        <div className="flex items-center gap-3 mb-3">
          <CreditCard className="w-5 h-5 text-secondary" />
          <div>
            <p className="text-sm font-medium text-foreground">Top Up with Card</p>
            <p className="text-xs text-muted-foreground">Powered by Crossmint</p>
          </div>
        </div>
        <button className="w-full py-3 rounded-xl bg-secondary/15 text-secondary border border-secondary/25 text-sm font-medium hover:bg-secondary/25 transition-all">
          Buy USDC with Card
        </button>
      </div>

      {/* Wallet Breakdown */}
      <div className="glass-card p-5 space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Wallets</p>
        {[
          { name: "Main Wallet", balance: 2347.32, tag: "Active" },
          { name: "Home Wallet", balance: 387.50, tag: "Receiving" },
          { name: "Savings", balance: 112.50, tag: "" },
        ].map((w) => (
          <div key={w.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
                {w.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{w.name}</p>
                {w.tag && <p className="text-xs text-primary">{w.tag}</p>}
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">${w.balance.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletPage;
