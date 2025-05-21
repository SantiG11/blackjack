interface ScoreDisplayProps {
  score: number;
  player: string;
}

const ScoreDisplay = ({ score, player }: ScoreDisplayProps) => {
  return (
    <div className="flex gap-2">
      <div className=" bg-[#1a1a1a]/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#333333]/50 text-xs sm:text-sm">
        <span className="text-white/70 font-medium ">{player}: </span>
        <span className="font-extrabold text-[#d4af37]">{score}</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
