import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export interface Player {
  _id: string,
  link: string,
  name: string,
  position: string,
  age: string,
  control: string,
  movement: string,
  velocity: string,
  stamina: string,
  power: string,
  contact: string,
  speed: string,
  defense: string,
  isDrafted?: boolean
}

export type PriorityLists = {
  [id: string]: Player[]
}

const usePlayerStore = create(persist(
  (set) => ({
    loading: false,
    setLoading: (state: boolean) => set({ loading: state }),
    selectedPlayer: null,
    setSelectedPlayer: (player: Player | null) => set({ selectedPlayer: player }),
    players: [],
    setPlayers: (players: Player[]) => set({ players: players }),
    priorityLists: {} as PriorityLists,
    setPriorityLists: (priorityLists: PriorityLists) => set({ priorityLists: priorityLists }),
  }),
  {
    name: 'player-storage',
    storage: createJSONStorage(() => localStorage)
  }
));

export { usePlayerStore }