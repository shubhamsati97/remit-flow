import { useState } from "react";
import { TrendingUp, Shield, Clock, ChevronRight, Lock, Unlock, Star } from "lucide-react";
import {
  MOCK_BALANCE_USDC,
  calculateSafetyScore,
} from "@/lib/mockData";

const REMIT_SCORE = (() => {
  const totalWealth = MOCK_BALANCE_USDC + 500;
  const safety = calculateSafetyScore(MOCK_BALANCE_USDC, totalWealth);
  // Remit score factors: safety %, stream consistency, tenure
  return Math.min(Math.round(safety * 1.1 + 5), 100);
})();

interface LoanOffer {
  id: string;
  provider: string;
  maxAmount: number;
  apr: number;
  term: string;
  minScore: number;
  badge?: string;
}

const LOAN_OFFERS: LoanOffer[] = [
  { id: "1", provider: "StableCredit", maxAmount: 500, apr: 4.5, term: "30 days", minScore: 40, badge: "Best Rate" },
  { id: "2", provider: "RemitLend", maxAmount: 1500, apr: 6.2, term: "90 days", minScore: 60 },
  { id: "3", provider: "FlowFinance", maxAmount: 3000, apr: 8.0, term: "180 days", minScore: 75, badge: "High Limit" },
  { id: "4", provider: "MicroStream", maxAmount: 200, apr: 3.8, term: "14 days", minScore: 20, badge: "Quick Cash" },
  { id: "5", provider: "GlobalBridge Capital", maxAmount: 5000, apr: 9.5, term: "365 days", minScore: 90 },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-primary";
  if (score >= 60) return "text-secondary";
  if (score >= 40) return "text-yellow-400";
  return "text-destructive";
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Building";
};

const LendingMarketplace = () => {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  const eligibleOffers = LOAN_OFFERS.filter((o) => REMIT_SCORE >= o.minScore);
  const lockedOffers = LOAN_OFFERS.filter((o) => REMIT_SCORE < o.minScore);

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Lending Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Access loans based on your remit score
        </p>
      </div>

      {/* Remit Score Card */}
      <div className="glass-card glow-green p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Your Remit Score
            </span>
          </div>

          <div className="flex items-end gap-3">
            <span className={`text-5xl font-bold ${getScoreColor(REMIT_SCORE)}`}>
              {REMIT_SCORE}
            </span>
            <span className={`text-sm font-medium mb-1.5 ${getScoreColor(REMIT_SCORE)}`}>
              {getScoreLabel(REMIT_SCORE)}
            </span>
          </div>

          {/* Score bar */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
              style={{ width: `${REMIT_SCORE}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
            <span>0</span>
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Excellent</span>
            <span>100</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Stream History", value: "6 mo", icon: Clock },
              { label: "Stability", value: `${Math.round(REMIT_SCORE * 0.85)}%`, icon: Shield },
              { label: "On-time", value: "100%", icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs font-semibold text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Eligible Offers */}
      {eligibleOffers.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Available Offers ({eligibleOffers.length})
          </p>
          {eligibleOffers.map((offer) => (
            <button
              key={offer.id}
              onClick={() => setSelectedLoan(selectedLoan === offer.id ? null : offer.id)}
              className={`glass-card p-4 w-full text-left transition-all ${
                selectedLoan === offer.id ? "border-primary/40 glow-green" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{offer.provider}</p>
                      {offer.badge && (
                        <span className="text-[10px] font-medium bg-primary/15 text-primary px-2 py-0.5 rounded-full">
                          {offer.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{offer.term} · Min score {offer.minScore}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${
                  selectedLoan === offer.id ? "rotate-90" : ""
                }`} />
              </div>

              {selectedLoan === offer.id && (
                <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in-up">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Max Amount</p>
                      <p className="text-sm font-bold text-foreground">${offer.maxAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">APR</p>
                      <p className="text-sm font-bold text-primary">{offer.apr}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Term</p>
                      <p className="text-sm font-bold text-foreground">{offer.term}</p>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all">
                    Apply Now
                  </button>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Locked Offers */}
      {lockedOffers.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Unlock with Higher Score ({lockedOffers.length})
          </p>
          {lockedOffers.map((offer) => (
            <div key={offer.id} className="glass-card p-4 opacity-60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{offer.provider}</p>
                    <p className="text-xs text-muted-foreground">
                      Requires score {offer.minScore} · Up to ${offer.maxAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Unlock className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LendingMarketplace;
