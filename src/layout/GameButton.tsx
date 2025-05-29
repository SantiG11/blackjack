interface ButtonProps {
  buttonText: string;
  disabled: boolean;
  action: () => void;
  bg?: string;
}

export default function GameButton({
  buttonText,
  disabled,
  action,
  bg = "bg-[#10a167]",
}: ButtonProps) {
  return (
    <button
      onClick={() => action()}
      disabled={disabled}
      className={` ${bg} font-body font-bold text-white border border-[#0f5438] py-2 px-4 sm:px-8 text-xs  w-32 sm:text-xs  sm:flex-none rounded-xl ${
        disabled ? "opacity-50 " : "hover:cursor-pointer hover:opacity-80"
      }`}
    >
      {buttonText}
    </button>
  );
}
