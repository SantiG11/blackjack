interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  return (
    <div>
      <h3>Score: </h3>
      <span>{score}</span>
    </div>
  );
};

export default ScoreDisplay;
