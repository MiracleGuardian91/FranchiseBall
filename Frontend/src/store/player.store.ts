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

const usePlayerStore = create(persist(
  (set) => ({
    loading: false,
    setLoading: (state: boolean) => set({ loading: state }),
    selectedPlayer: null,
    setSelectedPlayer: (player: Player) => set({ selectedPlayer: player }),
    priorityPlayers: [],
    setPriorityPlayers: (players: Player[]) => set({ priorityPlayers: players }),
    players: [],
    setPlayers: (players: Player[]) => set({ players: players }),
  }),
  {
    name: 'player-storage',
    storage: createJSONStorage(() => localStorage)
  }
));

export { usePlayerStore }