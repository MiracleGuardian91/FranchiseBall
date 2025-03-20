import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RiSave3Fill } from "react-icons/ri";
import * as XLSX from "xlsx";

import { Player, usePlayerStore } from "../store/player.store";

const PriorityList = () => {
  const {
    selectedPlayer,
    setSelectedPlayer,
    priorityPlayers,
    setPriorityPlayers,
  } = usePlayerStore() as {
    selectedPlayer: Player;
    setSelectedPlayer: (player: Player | null) => void;
    priorityPlayers: Player[];
    setPriorityPlayers: (players: Player[]) => void;
  };

  const [position, setPosition] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const addPlayerToList = () => {
    if (!selectedPlayer || position === null) return;

    if (priorityPlayers.length >= 22) {
      toast.error("You can only add up to 22 players.");
      return;
    }

    const updatedPriorityPlayers = [...priorityPlayers];
    updatedPriorityPlayers.splice(position - 1, 0, selectedPlayer);
    setPriorityPlayers(updatedPriorityPlayers);
    setPosition(null);
    setSelectedPlayer(null);
  };

  const finalizePriorityList = () => {
    if (priorityPlayers.length === 0) {
      toast.error("No players in the priority list.");
      return;
    }

    const playerData = priorityPlayers.map((player, index) => ({
      Round: index + 1,
      Link: player.link,
      Name: player.name,
      Position: player.position,
      Age: player.age,
      Power: player.power,
      Contact: player.contact,
      Speed: player.speed,
      Defense: player.defense,
      Control: player.control,
      Movement: player.movement,
      Velocity: player.velocity,
      Stamina: player.stamina,
    }));

    const ws = XLSX.utils.json_to_sheet(playerData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Priority List");
    XLSX.writeFile(wb, "priority_list.xlsx");
  };

  const handleSelectRow = (index: number) => {
    const newSelectedRows = new Set(selectedRows);

    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }

    setSelectedRows(newSelectedRows);

    if (newSelectedRows.size === 2) {
      const selectedIndices = Array.from(newSelectedRows);
      const updatedPriorityPlayers = [...priorityPlayers];
      const [firstIndex, secondIndex] = selectedIndices;

      const temp = updatedPriorityPlayers[firstIndex];
      updatedPriorityPlayers[firstIndex] = updatedPriorityPlayers[secondIndex];
      updatedPriorityPlayers[secondIndex] = temp;

      setPriorityPlayers(updatedPriorityPlayers);
      setSelectedRows(new Set());

      toast.success(
        `Players at positions ${firstIndex + 1} and ${
          secondIndex + 1
        } have been swapped.`
      );
    }
  };

  useEffect(() => {
    setPriorityPlayers([]);
  }, []);

  return (
    <div className="min-h-full max-h-[calc(100vh-8rem)] overflow-y-auto p-4 bg-transparent border border-stroke dark:bg-boxdark dark:border-strokedark">
      <div className="flex justify-between items-center gap-4">
        <span className="text-2xl text-black dark:text-white font-medium">
          Priority List
        </span>
        <button
          className="flex items-center gap-2 cursor-pointer border border-primary bg-primary px-4 py-1.5 text-white transition hover:bg-opacity-90 whitespace-nowrap"
          onClick={finalizePriorityList}
        >
          <RiSave3Fill />
          Finalize
        </button>
      </div>
      {selectedPlayer && (
        <div className="mt-4">
          <span className="text-lg">
            Selected Player: {selectedPlayer.name}
          </span>
          <div className="flex items-center mt-4 gap-2">
            <input
              type="number"
              min={1}
              max={22}
              value={position || ""}
              onChange={(e) => setPosition(Number(e.target.value))}
              placeholder="Select Position (1-22)"
              className="w-full px-4 py-1.5 rounded-md border border-stroke bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <button
              className="cursor-pointer rounded-lg border border-primary bg-primary px-4 py-1.5 text-white transition hover:bg-opacity-90 whitespace-nowrap"
              onClick={addPlayerToList}
            >
              Add to Priority List
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full table-auto bg-white dark:bg-bodydark border border-stroke dark:border-strokedark rounded-md mt-4">
        <thead className="bg-gray dark:bg-boxdark">
          <tr className="bg-gray-200 dark:bg-boxdark">
            <th />
            <th className="px-6 py-3 text-left text-black dark:text-white">
              Round
            </th>
            <th className="px-6 py-3 text-left text-black dark:text-white">
              Player Name
            </th>
          </tr>
        </thead>
        <tbody>
          {priorityPlayers.map((player, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 1
                  ? "bg-white dark:bg-bodydark"
                  : "bg-whiter dark:bg-bodydark1"
              } hover:bg-gray-100 hover:bg-stroke dark:hover:bg-white cursor-pointer dark:text-strokedark`}
              onClick={() => {
                handleSelectRow(index);
              }}
            >
              <td className="px-6 py-2">
                <input type="checkbox" checked={selectedRows.has(index)} />
              </td>
              <td className="px-6 py-2">{index + 1}</td>
              <td className="px-6 py-2">{player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriorityList;
