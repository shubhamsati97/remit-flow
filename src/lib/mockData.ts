export const MOCK_BALANCE_USDC = 2847.32;
export const ARS_RATE = 1247.5;
export const NGN_RATE = 1580.2;

export const LOCAL_CURRENCY = {
  code: "ARS",
  name: "Argentine Peso",
  symbol: "AR$",
  rate: ARS_RATE,
  volatility30d: -12.4,
};

export const MOCK_TRANSACTIONS = [
  {
    id: "1",
    type: "stream" as const,
    amount: 12.5,
    currency: "USDC",
    destination: "Home Wallet",
    status: "success" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    exchangeRate: 1245.8,
    localAmount: 15572.5,
  },
  {
    id: "2",
    type: "stream" as const,
    amount: 12.5,
    currency: "USDC",
    destination: "Home Wallet",
    status: "success" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    exchangeRate: 1248.2,
    localAmount: 15602.5,
  },
  {
    id: "3",
    type: "stream" as const,
    amount: 25.0,
    currency: "USDC",
    destination: "Savings",
    status: "success" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    exchangeRate: 1242.1,
    localAmount: 31052.5,
  },
  {
    id: "4",
    type: "stream" as const,
    amount: 12.5,
    currency: "USDC",
    destination: "Home Wallet",
    status: "success" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    exchangeRate: 1250.0,
    localAmount: 15625.0,
  },
  {
    id: "5",
    type: "topup" as const,
    amount: 100.0,
    currency: "USDC",
    destination: "Main Wallet",
    status: "success" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    exchangeRate: 1235.5,
    localAmount: 123550.0,
  },
];

export const calculateSafetyScore = (usdcBalance: number, totalWealth: number) => {
  if (totalWealth === 0) return 0;
  return Math.round((usdcBalance / totalWealth) * 100);
};

export const calculateVolatilitySavings = (usdcHeld: number, volatilityPercent: number) => {
  const wouldHaveLost = usdcHeld * (Math.abs(volatilityPercent) / 100);
  return Math.round(wouldHaveLost * 100) / 100;
};
