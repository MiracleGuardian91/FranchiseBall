import { Modal } from 'rizzui'

import { Team } from '../store/team.store'

const TeamModal = ({ isOpen, onClose, team }: {
  isOpen: boolean,
  onClose: () => void,
  team: Team
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} customSize="xl">
      <div
        className="bg-white rounded-md px-20 pt-8 pb-6 transition duration-150 ease-in-out dark:bg-boxdark"
      >
        <div className="flex flex-col items-center">
          <span className='text-2xl font-semibold text-black dark:text-white'>{team.team_name}</span>
          <div className='flex items-end gap-20 mt-8'>
            <div className='flex flex-col items-end gap-4'>
              <div className='flex flex-col items-center'>
                <span className='text-lg text-black dark:text-white font-medium'>Wins</span>
                <span>{team.win}</span>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col items-center'>
                  <span className='text-lg text-black dark:text-white font-medium'>AVG</span>
                  <span>{team.avg}</span>
                </div>
                <div className='flex flex-col items-center'>
                  <span className='text-lg text-black dark:text-white font-medium'>OBP</span>
                  <span>{team.obp}</span>
                </div>
                <div className='flex flex-col items-center'>
                  <span className='text-lg text-black dark:text-white font-medium'>Era</span>
                  <span>{team.era}</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start gap-4'>
              <div className='flex flex-col items-center'>
                <span className='text-lg text-black dark:text-white font-medium'>Losses</span>
                <span>{team.loss}</span>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col items-center'>
                  <span className='text-lg text-black dark:text-white font-medium'>Whip</span>
                  <span>{team.whip}</span>
                </div>
                <div className='flex flex-col items-center'>
                  <span className='text-lg text-black dark:text-white font-medium'>Runs</span>
                  <span>{team.runs_on}</span>
                </div>
                <div className='flex flex-col items-center'>
                  <span className='text-lg text-black dark:text-white font-medium'>R +/-</span>
                  <span>{team.runs_differential}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-1 mt-8'>
            <span className='text-lg text-black dark:text-white font-medium'>World Series: </span>
            <span>{team.world_titles}</span>
          </div>
          <div className='flex items-center gap-6 mt-1'>
            <div className='flex items-center gap-1'>
              <span className='text-lg text-black dark:text-white font-medium'>League Titles: </span>
              <span>{team.league_titles}</span>
            </div>
            <div className='flex items-center gap-1'>
              <span className='text-lg text-black dark:text-white font-medium'>Division Titles: </span>
              <span>{team.division_titles}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TeamModal;