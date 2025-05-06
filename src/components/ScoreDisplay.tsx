interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  return (
    <div className="flex gap-2">
      <h3 className="font-bold">Score: </h3>
      <span className="font-extrabold">{score}</span>
    </div>
  );
};

export default ScoreDisplay;
