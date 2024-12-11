import { MissionType } from "@/types/MissionType";
import { ReferralType } from "@/types/ReferralType";
import {
  BoosterType,
  BoosterTypes,
  DailyBoosterType,
  Level,
} from "@/types/UserType";
import { create } from "zustand";

type StoreStateType = {
  boosters: Record<BoosterTypes, BoosterType>;
  totalDailyRewards: number;
  dailyResetEnergy: DailyBoosterType;
  maxDailyResetEnergy: number;
  maxLevel: number;
  levels: Level[];
  levelUp: {
    max_energy: number;
    earn_per_tap: number;
  };
  referral: ReferralType;
  missionTypes: MissionType[];
  totalReferals: number;
};

export const uesStore = create<StoreStateType>(() => ({
  boosters: {
    energy_limit: { level: 0, cost: 0, increase_by: 0 },
    multi_tap: { level: 0, cost: 0, increase_by: 0 },
    full_energy: { level: 0, cost: 0, increase_by: 0 },
  },
  totalDailyRewards: 0,
  dailyResetEnergy: { uses_today: 0, next_available_at: null },
  maxDailyResetEnergy: 6,
  maxLevel: 18,
  levels: [],
  levelUp: {
    max_energy: 500,
    earn_per_tap: 1,
  },
  totalReferals: 0,
  referral: {
    base: {
      welcome: 0,
      levelUp: {},
    },
    premium: {
      welcome: 0,
      levelUp: {},
    },
  },
  missionTypes: [],
}));
