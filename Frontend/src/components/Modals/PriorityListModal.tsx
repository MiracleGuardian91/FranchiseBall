import { Modal } from "rizzui/modal";
import PlayerTable from "../PlayerTable";
import PriorityList from "../PriorityList";

import { IoMdClose } from "react-icons/io";

const PriorityListModal = ({ isOpen, onClose }: {
  isOpen: boolean,
  onClose: () => void
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      containerClassName="max-w-[90%] max-h-full bg-white dark:bg-boxdark rounded-none px-4 py-6"
    >
      <div className="flex justify-end mb-4 cursor-pointer hover:text-red-400" onClick={onClose}>
        <IoMdClose className="text-2xl" />
      </div>
      <div className="grid grid-cols-10 gap-4 h-[calc(100vh-6rem)]">
        <div className="col-span-5 md:col-span-6 xl:col-span-7 overflow-x-auto">
          <PlayerTable />
        </div>
        <div className="col-span-5 md:col-span-4 xl:col-span-3">
          <PriorityList />
        </div>
      </div>
    </Modal>
  )
}

export default PriorityListModal;