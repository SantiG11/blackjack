interface ButtonProps {
  buttonText: string;
  disabled?: boolean;
  action: () => void;
}

export default function SecondaryButton({
  buttonText,
  disabled = false,
  action,
}: ButtonProps) {
  return (
    <button
      onClick={() => action()}
      disabled={disabled}
      className=" bg-[#1a1a1a]/60 backdrop-blur-sm  px-2 py-2 md:py-1.5 rounded-lg border border-[#333333]/50 text-xs font-medium sm:text-sm hover:cursor-pointer hover:bg-[#2a2a2a] z-10"
    >
      {buttonText}
    </button>
  );
}
