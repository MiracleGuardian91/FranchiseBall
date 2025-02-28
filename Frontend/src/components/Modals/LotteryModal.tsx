import { Modal } from "rizzui/modal";
import TeamTable from "../TeamTable";
import { IoMdClose } from "react-icons/io";

const LotteryModal = ({ isOpen, onClose }: {
  isOpen: boolean,
  onClose: () => void
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="max-w-[90%] max-h-full bg-white dark:bg-boxdark rounded-none px-4 py-6"
    >
      <div className="flex justify-end mb-4 cursor-pointer hover:text-red-400" onClick={onClose}>
        <IoMdClose className="text-2xl" />
      </div>
      <TeamTable />
    </Modal >
  )
}

export default LotteryModal;