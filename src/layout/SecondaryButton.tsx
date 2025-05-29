interface ButtonProps {
  buttonText: string;
  disabled?: boolean;
  textSize?: string;
  action: () => void;
}

export default function SecondaryButton({
  buttonText,
  disabled = false,
  textSize = "text-xs",
  action,
}: ButtonProps) {
  return (
    <button
      onClick={() => action()}
      disabled={disabled}
      className={`bg-[#1a1a1a]/60 backdrop-blur-sm font-body font-bold px-2 py-2 md:py-1.5 rounded-lg border border-[#333333]/50 ${textSize} hover:cursor-pointer hover:bg-[#2a2a2a] z-10 `}
    >
      {buttonText}
    </button>
  );
}
