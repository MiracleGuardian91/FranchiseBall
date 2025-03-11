import { Team, useTeamStore } from "../../store/team.store";

const LotteryTable = () => {
  const { teams, lotteryTeams } = useTeamStore() as {
    teams: Team[];
    lotteryTeams: Team[] | null;
  };

  const sortedTeams = teams.sort((a, b) =>
    a.team_name.localeCompare(b.team_name)
  );

  const blankRows: Team[] = new Array(teams.length).fill({ team_name: '' } as Team);
  const displayTeams = lotteryTeams ? [
    ...lotteryTeams,
    ...blankRows.slice(0, sortedTeams.length - lotteryTeams.length),
  ] : blankRows;

  return (
    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark">
      <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
        <table className="min-w-full autoborder border-stroke dark:border-strokedark">
          <thead>
            <tr className="bg-gray dark:bg-boxdark border-b border-stroke dark:border-b-strokedark">
              <th className="px-6 py-4 text-left text-black dark:text-white w-1/12">
                No
              </th>
              <th className="px-6 py-4 text-left text-black dark:text-white w-11/12">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {displayTeams.length > 0 ? (
              displayTeams.slice().map((team, index) => (
                <tr
                  key={index}
                  className={` bg-white dark:bg-boxdark whitespace-nowrap cursor-pointer dark:text-white ${
                    index === displayTeams.length - 1
                      ? ""
                      : "border-b border-b-stroke dark:border-b-strokedark"
                  }`}
                >
                  <td className={`w-1/12 ${sortedTeams.findIndex(
                      (item) => item.team_name === team.team_name
                    ) === -1 ? 'py-5' : 'px-6 py-2 '}`}>
                    {sortedTeams.findIndex(
                      (item) => item.team_name === team.team_name
                    ) !== -1
                      ? sortedTeams.findIndex(
                          (item) => item.team_name === team.team_name
                        ) + 1
                      : ""}
                  </td>
                  <td className="px-6 py-2 w-11/12">{team.team_name}</td>
                </tr>
              ))
            ) : (
              <tr className="border-t border-t-stroke dark:border-t-strokedark">
                <td
                  colSpan={14}
                  className="px-10 py-3 text-black dark:text-white text-lg"
                >
                  No teams
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LotteryTable;
