interface ButtonProps {
  buttonText: string;
  disabled: boolean;
  action: () => void;
}

export default function GameButton({
  buttonText,
  disabled,
  action,
}: ButtonProps) {
  return (
    <button
      onClick={() => action()}
      disabled={disabled}
      className=" bg-green-500  rounded-full h-14 w-14 text-sm font-bold hover:cursor-pointer"
    >
      {buttonText}
    </button>
  );
}
