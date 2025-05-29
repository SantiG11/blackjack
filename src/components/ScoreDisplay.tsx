interface ScoreDisplayProps {
  score: number;
  player: string;
}

const ScoreDisplay = ({ score, player }: ScoreDisplayProps) => {
  return (
    <div className="flex gap-2">
      <div className=" bg-[#1a1a1a]/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#333333]/50 text-sm sm:text-sm font-heading font-bold 2xl:text-base">
        <span className="text-white/70  ">{player}: </span>
        <span className=" text-[#d4af37] ">{score}</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
