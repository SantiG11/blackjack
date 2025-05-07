import Card, { CardType } from "./Card";
import ScoreDisplay from "./ScoreDisplay";

interface PlayerProps {
  hand: CardType[]; // Let's call the prop 'hand'
  score: number;
}

export default function Player({ hand, score }: PlayerProps) {
  return (
    <div className="flex flex-col gap-4">
      <ScoreDisplay score={score} />
      <h2>Player cards: </h2>
      <div className=" flex gap-5 flex-wrap w-2xl h-36  p-3">
        {hand.map((card: CardType, index: number) => {
          return <Card key={index} suit={card.suit} value={card.value} />;
        })}
      </div>
    </div>
  );
}
