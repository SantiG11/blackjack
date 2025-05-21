import SecondaryButton from "../layout/SecondaryButton";

interface GameMessageProps {
  message: string;
  action?: () => void;
  btnName?: string;
}

export default function GameMessage({
  message,
  action,
  btnName,
}: GameMessageProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
      <div className="bg-[#1a1a1a]/60 flex flex-col justify-center items-center gap-4 backdrop-blur-sm  p-6 rounded-lg shadow-lg text-center z-100 w-3xs h-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p>{message}</p>
        {action && (
          <SecondaryButton
            action={action}
            buttonText={btnName ? btnName : ""}
          />
        )}
      </div>
    </div>
  );
}
