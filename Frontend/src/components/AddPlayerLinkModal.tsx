import { useState } from "react";
import { toast } from "sonner";
import { Modal } from "rizzui/modal";
import { Player, usePlayerStore } from "../store/player.store";
import { Team, useTeamStore } from "../store/team.store";

const AddPlayerLinkModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [link, setLink] = useState<string>("");
  const { players } = usePlayerStore() as { players: Player[] };
  const { selectedTeam, setSelectedTeam } = useTeamStore() as {
    selectedTeam: Team;
    setSelectedTeam: (team: Team) => void;
  };

  const handleAddLink = () => {
    if (link.length === 0) {
      toast.error("Input player link");
    } else if (
      selectedTeam?.players?.some((player: Player) => player.link === link)
    ) {
      toast.error("This user is already added");
    } else {
      const player = players.find((player: Player) => player.link === link);
      if (player) {
        setSelectedTeam({
          ...selectedTeam,
          players: [...(selectedTeam?.players || []), player],
        });
        onClose();
        setLink("");
      } else {
        toast.error("No matched player. Input another link.");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="bg-white dark:bg-boxdark p-4 w-[450px]"
    >
      <span className="font-semibold text-black dark:text-white">
        Add Player Link
      </span>
      <input
        name="link"
        type="text"
        placeholder="Enter new player link"
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
        className="w-full rounded-lg border border-stroke bg-transparent dark:bg-transparent py-1.5 px-3 mt-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <div className="flex justify-end mt-3">
        <button
          className="flex items-center gap-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-1.5 text-white hover:bg-opacity-90 transition whitespace-nowrap"
          onClick={handleAddLink}
        >
          <span>Add Link</span>
        </button>
      </div>
    </Modal>
  );
};

export default AddPlayerLinkModal;
