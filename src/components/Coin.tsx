import { coinBg, coinText } from "../utils/GameConstants";

interface CoinProps {
  value: number;
  disabled: boolean;
  action: () => void;
}

export function Coin({ value, disabled, action }: CoinProps) {
  const background = coinBg(value);
  const textColor = coinText(value);

  return (
    <button
      onClick={action}
      disabled={disabled}
      className="relative flex m-1 items-center justify-center  hover:cursor-pointer "
    >
      <div
        className={`h-10 w-10 md:h-11 md:w-11 font-bold text-[12px] rounded-full  border-4 border-dashed border-black flex justify-center items-center ${background} ${
          disabled && "opacity-50"
        } hover:cursor-pointer`}
      >
        <label
          className={`bg-gray-200 ${textColor} font-serif font-bold w-11/12 h-11/12 rounded-full flex justify-center items-center  hover:cursor-pointer`}
        >
          ${value}
        </label>
      </div>
    </button>
  );
}
