import { useEffect, useState } from "react";
import { toast } from "sonner";
import Axios from "../../config/axios";
import { Player, usePlayerStore } from "../../store/player.store";
import { Team, useTeamStore } from "../../store/team.store";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

import AddPlayerLinkModal from "../../components/Modals/AddPlayerLinkModal";
import PriorityListModal from "../../components/Modals/PriorityListModal";
import LotteryModal from "../../components/Modals/LotteryModal";

const Dashboard = () => {
  const { loading: playerLoading, setLoading: setPlayerLoading, setPlayers } = usePlayerStore() as {
    loading: boolean,
    selectedPlayer: Player,
    setLoading: (state: boolean) => void,
    setPlayers: (players: Player[]) => void
  }
  const { loading: teamLoading, selectedTeam, setLoading: setTeamLoading, setSelectedTeam, setTeams } = useTeamStore() as {
    loading: boolean,
    selectedTeam: Team,
    setLoading: (state: boolean) => void,
    setSelectedTeam: (team: Team) => void,
    setTeams: (teams: Team[]) => void
  }
  const [isOpenAddPlayerLinkModal, setIsOpenAddPlayerLinkModal] = useState<boolean>(false);
  const [isOpenPriorityListModal, setIsOpenPriorityListModal] = useState<boolean>(false);
  const [isOpenLotteryModal, setIsOpenLotteryModal] = useState<boolean>(false);

  const handleRemove = (player: Player) => {
    setSelectedTeam({
      ...selectedTeam,
      players: selectedTeam.players?.filter(p => p.link !== player.link) || []
    })
  }

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
          const allTeams = res.data;
          const targetTeam = allTeams.filter((team: Team) => team.team_name === 'Cincinnati Reds');
          setTeams(allTeams);
          setSelectedTeam(targetTeam[0]);
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
    </div> : <div className="flex flex-col items-center">
      <span className='text-2xl font-semibold text-black dark:text-white'>{selectedTeam?.team_name}</span>
      <div className='flex items-end gap-20 mt-8'>
        <div className='flex flex-col items-end gap-4'>
          <div className='flex flex-col items-center'>
            <span className='text-lg text-black dark:text-white font-medium'>Wins</span>
            <span>{selectedTeam?.win}</span>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col items-center'>
              <span className='text-lg text-black dark:text-white font-medium'>AVG</span>
              <span>{selectedTeam?.avg}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-lg text-black dark:text-white font-medium'>OBP</span>
              <span>{selectedTeam?.obp}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-lg text-black dark:text-white font-medium'>Era</span>
              <span>{selectedTeam?.era}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start gap-4'>
          <div className='flex flex-col items-center'>
            <span className='text-lg text-black dark:text-white font-medium'>Losses</span>
            <span>{selectedTeam?.loss}</span>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col items-center'>
              <span className='text-lg text-black dark:text-white font-medium'>Whip</span>
              <span>{selectedTeam?.whip}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-lg text-black dark:text-white font-medium'>Runs</span>
              <span>{selectedTeam?.runs_on}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-lg text-black dark:text-white font-medium'>R +/-</span>
              <span>{selectedTeam?.runs_differential}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-1 mt-8'>
        <span className='text-lg text-black dark:text-white font-medium'>World Series: </span>
        <span>{selectedTeam?.world_titles}</span>
      </div>
      <div className='flex items-center gap-6 mt-1'>
        <div className='flex items-center gap-1'>
          <span className='text-lg text-black dark:text-white font-medium'>League Titles: </span>
          <span>{selectedTeam?.league_titles}</span>
        </div>
        <div className='flex items-center gap-1'>
          <span className='text-lg text-black dark:text-white font-medium'>Division Titles: </span>
          <span>{selectedTeam?.division_titles}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        {Array.from({ length: 5 - (selectedTeam?.players?.length || 0) }).map((_, index) => (
          <button
            key={index}
            className="flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-gray-steel-600 dark:border-form-strokedark px-4 py-1.5 text-steel-600 dark:text-gray hover:scale-105 transition whitespace-nowrap"
            onClick={() => { setIsOpenAddPlayerLinkModal(true) }}
          >
            <FiPlus />
            <span>Add Player Link</span>
          </button>
        ))}
      </div>
      {selectedTeam?.players?.length > 0 &&
        <div className="max-w-full overflow-x-auto border border-stroke dark:border-strokedark mt-4">
          <table className='autoborder'>
            <thead>
              <tr className='bg-gray dark:bg-boxdark'>
                <th className="px-6 py-4 text-left text-black dark:text-white"></th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Link</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Name</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Position</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Age</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Power</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Contact</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Speed</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Defense</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Control</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Movement</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Velocity</th>
                <th className="px-6 py-4 text-left text-black dark:text-white">Stamina</th>
              </tr>
            </thead>
            <tbody>
              {selectedTeam?.players.map((player, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 1 ? 'bg-white dark:bg-bodydark' : 'bg-whiter dark:bg-bodydark1'} whitespace-nowrap dark:text-strokedark`}
                >
                  <td className="px-6 py-2">
                    <div
                      className="cursor-pointer hover:text-black dark:hover:text-white"
                      onClick={() => { handleRemove(player) }}
                    >
                      <FiMinus />
                    </div>
                  </td>
                  <td className="px-6 py-2">{player.link}</td>
                  <td className="px-6 py-2">{player.name}</td>
                  <td className="px-6 py-2">{player.position}</td>
                  <td className="px-6 py-2">{player.age}</td>
                  <td className="px-6 py-2">{player.power}</td>
                  <td className="px-6 py-2">{player.contact}</td>
                  <td className="px-6 py-2">{player.speed}</td>
                  <td className="px-6 py-2">{player.defense}</td>
                  <td className="px-6 py-2">{player.control}</td>
                  <td className="px-6 py-2">{player.movement}</td>
                  <td className="px-6 py-2">{player.velocity}</td>
                  <td className="px-6 py-2">{player.stamina}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      <div className="flex items-center gap-3 mt-6">
        <button
          className="flex items-center gap-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-1.5 text-white transition hover:bg-opacity-90 whitespace-nowrap"
          onClick={() => { setIsOpenPriorityListModal(true) }}
        >
          Priority List
        </button>
        <button
          className="flex items-center gap-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-1.5 text-white transition hover:bg-opacity-90 whitespace-nowrap"
          onClick={() => { setIsOpenLotteryModal(true) }}
        >
          Lottery
        </button>
        <button
          className="flex items-center gap-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-1.5 text-white transition hover:bg-opacity-90 whitespace-nowrap"
        >
          Draft
        </button>
      </div>
      <AddPlayerLinkModal isOpen={isOpenAddPlayerLinkModal} onClose={() => { setIsOpenAddPlayerLinkModal(false) }} />
      <PriorityListModal isOpen={isOpenPriorityListModal} onClose={() => { setIsOpenPriorityListModal(false) }} />
      <LotteryModal isOpen={isOpenLotteryModal} onClose={() => { setIsOpenLotteryModal(false) }} />
    </div>
  )
}

export default Dashboard;