import { create } from 'zustand';

export interface Player {
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
  defense: string
}

export interface PlayerStore {
  loading: boolean;
  setLoading: (state: boolean) => void;

  selectedPlayer: Player | null,
  setSelectedPlayer: (player: Player | null) => void,
  priorityPlayers: Player[],
  setPriorityPlayers: (players: Player[]) => void,
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
  selectedPlayer: null,
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  priorityPlayers: [],
  setPriorityPlayers: (players) => set({ priorityPlayers: players }),
  players: [],
  setPlayers: (players) => set({ players: players }),
}));

export { usePlayerStore }