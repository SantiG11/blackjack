import PlayerMoney from "./PlayerMoney";

interface PlayerMoneyControlsProps {
  playerMoney: number;
  handleAddMoney: () => void;
  handleResetMoney: () => void;
}

export default function PlayerMoneyControls({
  playerMoney,
  handleAddMoney,
  handleResetMoney,
}: PlayerMoneyControlsProps) {
  return (
    <div className="flex flex-col items-start gap-2 mt-4">
      <PlayerMoney money={playerMoney} />
      <button
        onClick={handleAddMoney}
        className="hover:cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors w-40 my-1"
      >
        Add money (+500)
      </button>
      <button
        onClick={handleResetMoney}
        className="hover:cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors w-40 my-1"
      >
        Reset money
      </button>
    </div>
  );
}
