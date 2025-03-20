import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Player } from './player.store';

export interface Team {
  name: string,
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

const useTeamStore = create(persist(
  (set) => ({
    loading: false,
    setLoading: (state: boolean) => set({ loading: state }),
    selectedTeam: null,
    setSelectedTeam: (team: Team) => set({ selectedTeam: team }),
    isLotteryStarted: false,
    setLotteryStarted: (value: boolean) => set({isLotteryStarted: value}),
    lotteryTeams: null,
    setLotteryTeams: (teams: Team[] | null) => set({ lotteryTeams: teams }),
    teams: [],
    setTeams: (teams: Team[]) => set({ teams: teams }),
  }),
  {
    name: 'team-storage',
    storage: createJSONStorage(() => localStorage)
  }
))

export { useTeamStore }