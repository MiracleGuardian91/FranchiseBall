import { Team, useTeamStore } from "../../store/team.store";

const AlphabeticalTeamTable = () => {
  const { teams, lotteryTeam } = useTeamStore() as {
    teams: Team[];
    lotteryTeam: Team;
  };

  return (
    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark">
      <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
        <table className="min-w-full autoborder border-stroke dark:border-strokedark">
          <thead>
            <tr className="bg-gray dark:bg-boxdark border-b border-stroke dark:border-b-strokedark">
              <th className="px-6 py-4 text-left text-black dark:text-white w-1/12">
                {" "}
                No
              </th>
              <th className="px-6 py-4 text-left text-black dark:text-white w-11/12">
                {" "}
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {teams
              .slice()
              .sort((a, b) => a.team_name.localeCompare(b.team_name))
              .map((team, index) => (
                <tr
                  key={index}
                  className={`${
                    team.team_name === lotteryTeam?.team_name
                      ? "text-yello-300 dark:text-yellow-300"
                      : "dark:text-white"
                  }
                  bg-white dark:bg-boxdark whitespace-nowrap cursor-pointer dark:text-strokedark ${
                    index === teams.length - 1
                      ? ""
                      : "border-b border-b-stroke dark:border-b-strokedark"
                  }`}
                >
                  <td className="px-6 py-2 w-1/12">{index + 1}</td>{" "}
                  <td className="px-6 py-2 w-11/12">{team.team_name}</td>{" "}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlphabeticalTeamTable;
