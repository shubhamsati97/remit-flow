import { useState } from "react";
import { Zap, Check, Users, ChevronDown, ChevronUp, Clock, CheckCircle2, XCircle, Plus } from "lucide-react";

const FREQUENCIES = ["Daily", "Weekly", "Real-time"] as const;
const DESTINATIONS = ["Home Wallet", "Savings"] as const;
type AmountMode = "percentage" | "absolute";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
}

interface DrawRequest {
  id: string;
  memberId: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  timestamp: Date;
}

const MOCK_FAMILY: FamilyMember[] = [
  { id: "1", name: "Maria García", relation: "Mother", avatar: "MG" },
  { id: "2", name: "Carlos García", relation: "Brother", avatar: "CG" },
  { id: "3", name: "Sofia García", relation: "Sister", avatar: "SG" },
];

const MOCK_REQUESTS: DrawRequest[] = [
  { id: "r1", memberId: "1", amount: 50, reason: "Groceries & utilities", status: "pending", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: "r2", memberId: "2", amount: 120, reason: "University tuition", status: "pending", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: "r3", memberId: "3", amount: 30, reason: "Medicine", status: "approved", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: "r4", memberId: "1", amount: 200, reason: "Rent payment", status: "approved", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
];

const StreamSetup = () => {
  const [amountMode, setAmountMode] = useState<AmountMode>("percentage");
  const [percentage, setPercentage] = useState(50);
  const [absoluteAmount, setAbsoluteAmount] = useState("100");
  const [frequency, setFrequency] = useState<typeof FREQUENCIES[number]>("Real-time");
  const [destination, setDestination] = useState<typeof DESTINATIONS[number]>("Home Wallet");
  const [saved, setSaved] = useState(false);
  const [familyExpanded, setFamilyExpanded] = useState(true);
  const [requests, setRequests] = useState<DrawRequest[]>(MOCK_REQUESTS);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleApproval = (requestId: string, status: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
  };

  const getMember = (memberId: string) => MOCK_FAMILY.find((m) => m.id === memberId);
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Flow Schedule</h1>
        <p className="text-sm text-muted-foreground mt-1">Set it and forget it — auto-convert your earnings to USDC.</p>
      </div>

      {/* Amount Mode Toggle */}
      <div className="glass-card p-5 space-y-4">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Conversion Amount
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setAmountMode("percentage")}
            className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              amountMode === "percentage"
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-muted/50 text-muted-foreground border border-transparent hover:border-border"
            }`}
          >
            % Percentage
          </button>
          <button
            onClick={() => setAmountMode("absolute")}
            className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              amountMode === "absolute"
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-muted/50 text-muted-foreground border border-transparent hover:border-border"
            }`}
          >
            $ Fixed Amount
          </button>
        </div>

        {amountMode === "percentage" ? (
          <div className="space-y-3">
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
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <div className="inline-flex items-baseline gap-1">
                <span className="text-2xl text-muted-foreground font-medium">$</span>
                <input
                  type="number"
                  min={1}
                  max={10000}
                  value={absoluteAmount}
                  onChange={(e) => setAbsoluteAmount(e.target.value)}
                  className="text-4xl font-bold text-gradient-green bg-transparent border-none outline-none text-center w-40
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="100"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">USDC per cycle</p>
            </div>
            <div className="flex gap-2 justify-center">
              {[25, 50, 100, 250, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAbsoluteAmount(String(amt))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    absoluteAmount === String(amt)
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>
        )}
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
            <Check className="w-4 h-4" /> Flow Updated
          </span>
        ) : (
          "Save Flow Settings"
        )}
      </button>

      {/* Family Plan */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => setFamilyExpanded(!familyExpanded)}
          className="w-full p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center">
              <Users className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-left">
              <h2 className="text-sm font-semibold text-foreground">Family Plan</h2>
              <p className="text-xs text-muted-foreground">
                {pendingCount > 0 ? `${pendingCount} pending approval${pendingCount > 1 ? "s" : ""}` : "All caught up"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                {pendingCount}
              </span>
            )}
            {familyExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {familyExpanded && (
          <div className="px-5 pb-5 space-y-4">
            {/* Family Members */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Members</span>
                <button className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              <div className="flex gap-3">
                {MOCK_FAMILY.map((member) => (
                  <div key={member.id} className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-secondary/15 border border-secondary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-secondary">{member.avatar}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{member.name.split(" ")[0]}</span>
                    <span className="text-[9px] text-muted-foreground/60">{member.relation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Draw Requests */}
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Draw Requests</span>
              <div className="mt-3 space-y-2">
                {requests.map((req) => {
                  const member = getMember(req.memberId);
                  if (!member) return null;
                  return (
                    <div
                      key={req.id}
                      className={`p-3 rounded-xl border transition-all ${
                        req.status === "pending"
                          ? "bg-muted/30 border-border"
                          : req.status === "approved"
                          ? "bg-primary/5 border-primary/10"
                          : "bg-destructive/5 border-destructive/10 opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-secondary">{member.avatar}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{req.reason}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-foreground">${req.amount}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {req.timestamp.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </div>
                        {req.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApproval(req.id, "rejected")}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => handleApproval(req.id, "approved")}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/15 text-primary hover:bg-primary/25 transition-colors"
                            >
                              Approve
                            </button>
                          </div>
                        ) : (
                          <span className={`flex items-center gap-1 text-xs font-medium ${
                            req.status === "approved" ? "text-primary" : "text-destructive"
                          }`}>
                            {req.status === "approved" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {req.status === "approved" ? "Approved" : "Declined"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamSetup;
