import Card, { CardType } from "./Card";

interface PlayerProps {
  hand: CardType[]; // Let's call the prop 'hand'
}

export default function Player({ hand }: PlayerProps) {
  return (
    <div>
      <h2>Player cards: </h2>
      {hand.map((card: CardType, index: number) => {
        return <Card key={index} suit={card.suit} value={card.value} />;
      })}
    </div>
  );
}
