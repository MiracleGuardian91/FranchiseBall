import { create } from 'zustand';
import { Player } from './player.store';

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
  players: Player[]
}

export interface TeamStore {
  loading: boolean;
  setLoading: (state: boolean) => void;

  selectedTeam: Team | null,
  setSelectedTeam: (team: Team) => void;

  teams: Team[];
  setTeams: (players: Team[]) => void;
}

const useTeamStore = create<TeamStore>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
  selectedTeam: null,
  setSelectedTeam: (team) => set({ selectedTeam: team }),
  teams: [],
  setTeams: (teams) => set({ teams: teams }),
}));

export { useTeamStore }