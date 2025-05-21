import { coinBg } from "../utils/GameConstants";

interface CoinProps {
  value: number;
  disabled: boolean;
  action: () => void;
}

export function Coin({ value, disabled, action }: CoinProps) {
  const background = coinBg(value);

  return (
    <button
      onClick={action}
      disabled={disabled}
      className="relative flex h-15 w-15  items-center justify-center  hover:cursor-pointer "
    >
      <div
        className={`h-15 w-15 font-bold text-sm rounded-full  border-6 border-dashed border-black flex justify-center items-center bg-${background} hover:cursor-pointer`}
      >
        <label
          className={`bg-gray-200 text-${background} font-serif font-bold w-11/12 h-11/12 rounded-full flex justify-center items-center  hover:cursor-pointer`}
        >
          ${value}
        </label>
      </div>
    </button>
  );
}
