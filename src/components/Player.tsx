import Card, { CardType } from "./Card";
import ScoreDisplay from "./ScoreDisplay";

interface PlayerProps {
  hand: CardType[]; // Let's call the prop 'hand'
  score: number;
}

export default function Player({ hand, score }: PlayerProps) {
  return (
    <div>
      <ScoreDisplay score={score} />
      <h2>Player cards: </h2>
      {hand.map((card: CardType, index: number) => {
        return <Card key={index} suit={card.suit} value={card.value} />;
      })}
    </div>
  );
}
