import { useEffect, useState } from "react";
import { toast } from "sonner";

import Axios from "../../config/axios";
import { Player, usePlayerStore } from "../../store/player.store";
import { Team, useTeamStore } from "../../store/team.store";

import TeamTable from "../../components/TeamTable";
import PriorityListModal from '../../components/PriorityListModal';

const Dashboard = () => {
  const { loading: playerLoading, setLoading: setPlayerLoading, setPlayers } = usePlayerStore() as {
    loading: boolean,
    setLoading: (state: boolean) => void,
    setPlayers: (players: Player[]) => void
  }
  const { loading: teamLoading, setLoading: setTeamLoading, setTeams } = useTeamStore() as {
    loading: boolean,
    setLoading: (state: boolean) => void,
    setTeams: (teams: Team[]) => void
  }
  const [isOpenPriorityListModal, setIsOpenPriorityListModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setPlayerLoading(true);
        const res = await Axios.get(`${import.meta.env.VITE_API_URL}/player`);
        if (res.status === 200) {
          setPlayers(res.data);
          setPlayerLoading(false);
        }
      } catch (err: any) {
        setPlayerLoading(false);
        toast.error(err.response.data.message);
      }
    }

    const fetchTeams = async () => {
      try {
        setTeamLoading(true);
        const res = await Axios.get(`${import.meta.env.VITE_API_URL}/team`);
        if (res.status === 200) {
          setTeams(res.data);
          setTeamLoading(false);
        }
      } catch (err: any) {
        setTeamLoading(false);
        toast.error(err.response.data.message);
      }
    }

    fetchPlayers();
    fetchTeams();
  }, []);

  return (
    (teamLoading || playerLoading) ? <div className="fixed top-0 left-0 z-99999 w-screen h-screen bg-white dark:bg-boxdark flex justify-center items-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div> : <div className="flex flex-col gap-5">
      <TeamTable />
      <div className="flex justify-center gap-4">
        <button
          className="flex items-center gap-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-1.5 text-white transition hover:bg-opacity-90 whitespace-nowrap"
          onClick={() => { setIsOpenPriorityListModal(true) }}
        >
          Priority List
        </button>
        <button
          className="flex items-center gap-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-1.5 text-white transition hover:bg-opacity-90 whitespace-nowrap"
        >
          Lottery
        </button>
        <button
          className="flex items-center gap-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-1.5 text-white transition hover:bg-opacity-90 whitespace-nowrap"
        >
          Draft
        </button>
      </div>

      <PriorityListModal isOpen={isOpenPriorityListModal} onClose={() => { setIsOpenPriorityListModal(false) }} />
    </div >
  )
}

export default Dashboard;