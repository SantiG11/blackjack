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
    <div className="bg-white p-6 rounded-lg shadow-lg text-center z-100 w-sm h-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p>{message}</p>
      {action && (
        <button
          onClick={action}
          className="hover:cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors w-40 my-1"
        >
          {btnName}
        </button>
      )}
    </div>
  );
}
