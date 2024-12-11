export type UserType = {
  telegram_id: number;
  balance: number;
  earn_per_tap: number;
  energy_limit_level: number;
  first_name: string;
  id: number;
  last_login_date: string;
  last_name: string;
  level_id: number;
  login_streak: number;
  available_energy: number;
  max_energy: number;
  multi_tap_level: number;
  username: string;
  level?: Level;
  production_per_hour: number;
};

export type Level = {
  id: number;
  level: number;
  name: string;
  from_balance: number;
  to_balance: number;
};

export type BoosterTypes = "multi_tap" | "energy_limit" | "full_energy";

export type BoosterType = {
  level: number;
  cost: number;
  increase_by: number;
};

export type DailyBoosterType = {
  uses_today: number;
  next_available_at: string | null;
};
