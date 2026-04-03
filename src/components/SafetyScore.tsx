import { Shield } from "lucide-react";

interface SafetyScoreProps {
  score: number;
}

const SafetyScore = ({ score }: SafetyScoreProps) => {
  const getColor = () => {
    if (score >= 70) return "text-primary";
    if (score >= 40) return "text-yellow-400";
    return "text-destructive";
  };

  const getLabel = () => {
    if (score >= 70) return "Well Protected";
    if (score >= 40) return "Moderate";
    return "At Risk";
  };

  return (
    <div className="glass-card p-4 flex items-center gap-4">
      <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 ${score >= 70 ? "border-primary/50" : score >= 40 ? "border-yellow-400/50" : "border-destructive/50"}`}>
        <Shield className={`w-6 h-6 ${getColor()}`} />
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle
            cx="28" cy="28" r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${(score / 100) * 163.36} 163.36`}
            className={getColor()}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">Safety Score</p>
        <p className={`text-xl font-bold ${getColor()}`}>{score}%</p>
        <p className="text-xs text-muted-foreground">{getLabel()}</p>
      </div>
    </div>
  );
};

export default SafetyScore;
