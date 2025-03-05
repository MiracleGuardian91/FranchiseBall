import { Team, useTeamStore } from "../../store/team.store";

const LotteryTable = () => {
  const { lotteryTeams } = useTeamStore() as {
    lotteryTeams: Team[] | null
  }

  return (
    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark">
      <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
        <table className='min-w-full autoborder border-stroke dark:border-strokedark'>
          <thead>
            <tr className='bg-gray dark:bg-boxdark'>
              <th className="px-6 py-4 text-left text-black dark:text-white">Name</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Win</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Loss</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">R +/-</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Avg</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Obp</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Era</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Whip</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Rank</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Runs on</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">World Titles</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">League Titles</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Division Titles</th>
              <th className="px-6 py-4 text-left text-black dark:text-white">Weighted Score</th>
            </tr>
          </thead>
          <tbody>
            {lotteryTeams ?
              lotteryTeams.slice()
                .map((team, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 1 ? 'bg-white dark:bg-bodydark' : 'bg-whiter dark:bg-bodydark1'} whitespace-nowrap cursor-pointer dark:text-strokedark hover:bg-stroke dark:hover:bg-white`}
                  >
                    <td className="px-6 py-2">{team.team_name}</td>
                    <td className="px-6 py-2">{team.win}</td>
                    <td className="px-6 py-2">{team.loss}</td>
                    <td className="px-6 py-2">{team.runs_differential}</td>
                    <td className="px-6 py-2">{team.avg}</td>
                    <td className="px-6 py-2">{team.obp}</td>
                    <td className="px-6 py-2">{team.era}</td>
                    <td className="px-6 py-2">{team.whip}</td>
                    <td className="px-6 py-2">{team.team_rank}</td>
                    <td className="px-6 py-2">{team.runs_on}</td>
                    <td className="px-6 py-2">{team.world_titles}</td>
                    <td className="px-6 py-2">{team.league_titles}</td>
                    <td className="px-6 py-2">{team.division_titles}</td>
                    <td className="px-6 py-2">{team.weighted_score}</td>
                  </tr>
                )) :
              <tr className="border-t border-t-stroke">
                <td colSpan={14} className="px-10 py-3 text-black dark:text-white text-lg">
                  No teams
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LotteryTable;