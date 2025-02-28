import { create } from 'zustand';

export interface Team {
  team_name: string,
  win: number,
  loss: number,
  runs_differential: number,
  avg: number,
  obp: number,
  era: number,
  whip: number,
  team_rank: number,
  runs_on: number,
  world_titles: number,
  league_titles: number,
  division_titles: number,
  weighted_score: number,
}

export interface TeamStore {
  loading: boolean;
  setLoading: (state: boolean) => void;

  teams: Team[];
  setTeams: (players: Team[]) => void;
}

const useTeamStore = create<TeamStore>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
  teams: [],
  setTeams: (teams) => set({ teams: teams }),
}));

export { useTeamStore }