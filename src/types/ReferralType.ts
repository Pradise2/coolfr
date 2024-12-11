export type ReferralType = Record<
  "base" | "premium",
  {
    welcome: number;
    levelUp: Record<number, number>;
  }
>;
