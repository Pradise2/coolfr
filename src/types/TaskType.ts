export type TaskType = {
  id: string;
  name: string;
  description?: string;
  type: string;
  link: string;
  image?: string;
  reward_coins: number;
  action_name: string;
  is_submitted: boolean;
  is_rewarded: boolean;
  submitted_at: string | null;
};

export type DailyTaskType = {
  id: number;
  name: string;
  description: string;
  reward_coins: number;
  required_login_streak: number;
  available: false;
  completed: false;
  status: string;
};

export type ReferralTaskType = {
  id: number;
  title: string;
  number_of_referrals: number;
  reward: number;
  is_completed?: boolean | null;
};
