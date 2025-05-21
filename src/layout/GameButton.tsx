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
  bg = "#10a167",
}: ButtonProps) {
  return (
    <button
      onClick={() => action()}
      disabled={disabled}
      className={` bg-[${bg}]   text-white border border-[#0f5438] py-2 px-4  rounded-xl sm:px-8 text-xs sm:text-sm flex-1 sm:flex-none ${
        disabled ? "opacity-50 " : "hover:cursor-pointer hover:bg-[#0c4830]"
      }`}
    >
      {buttonText}
    </button>
  );
}
