export type MissionType = {
  id: number;
  name: string;
};

export type MissionLevel = {
  id: number;
  level: number;
  cost: number;
  production_per_hour: number;
};

export type Mission = {
  id: number;
  name: string;
  image: string;
  production_per_hour: string | null;
  next_level?: MissionLevel;
  required_user_level?: number;
  required_friends_invitation?: number;
};
