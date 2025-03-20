import { useState } from "react";
import { Team, useTeamStore } from "../store/team.store";
import { Player, usePlayerStore } from "../store/player.store";

const ViewDraft = () => {
  const { teams } = useTeamStore() as {
    teams: Team[];
  };
  const { players } = usePlayerStore() as {
    players: Player[];
  };

  const draftedPlayers = players.filter(
    (player: Player) => player?.isDrafted === true
  );
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center bg-bodydark dark:bg-boxdark py-2.5">
        <span className="text-black dark:text-white text-lg font-medium">
          Status Bar - this shows current status like "{selectedTeam.name}"
        </span>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="w-1/2 md:w-1/4">
          <div className="overflow-y-auto max-h-[calc(100vh-17rem)]">
            <table className="min-w-full autoborder border-stroke dark:border-strokedark">
              <thead>
                <tr className="bg-white dark:bg-boxdark border-b border-stroke dark:border-b-strokedark">
                  <th className="px-6 py-4 text-left text-black dark:text-white w-1/12">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-black dark:text-white w-11/12">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr
                    key={index}
                    className={` bg-white dark:bg-boxdark whitespace-nowrap cursor-pointer ${
                      index === teams.length - 1
                        ? ""
                        : "border-b border-b-stroke dark:border-b-strokedark"
                    }`}
                  >
                    <td className="px-6 py-2 w-1/12">{index + 1}</td>
                    <td className="px-6 py-2 w-11/12">{team.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2"></div>
        <div className="w-1/4 md:w-1/2">
          <div className="overflow-y-auto max-h-[calc(100vh-17rem)]">
            <table className="min-w-full autoborder border-stroke dark:border-strokedark">
              <thead>
                <tr className="bg-white dark:bg-boxdark border-b border-stroke dark:border-b-strokedark">
                  <th className="px-6 py-4 text-left text-black dark:text-white">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-black dark:text-white">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-black dark:text-white">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-black dark:text-white"></th>
                </tr>
              </thead>
              <tbody>
                {draftedPlayers.map((player, index) => (
                  <tr
                    key={index}
                    className={` bg-white dark:bg-boxdark whitespace-nowrap cursor-pointer ${
                      index === teams.length - 1
                        ? ""
                        : "border-b border-b-stroke dark:border-b-strokedark"
                    }`}
                  >
                    <td className="px-6 h-12">{index + 1}</td>
                    <td className="px-6 h-12">{player.name}</td>
                    <td className="px-6 h-12">{player.position}</td>
                    <td className="px-6 h-12">
                      <button className="flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed rounded-lg border border-primary bg-primary disabled:bg-bodydark dark:disabled:bg-steel-500/20 disabled:border-none w-16 h-9 text-white disabled:dark:text-slate-400 transition hover:bg-opacity-90 whitespace-">
                        Pick
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDraft;
