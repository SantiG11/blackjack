import Card, { CardType } from "./Card";

interface DealerProps {
  hand: CardType[]; // Let's call the prop 'hand'
}

export default function Dealer({ hand }: DealerProps) {
  return (
    <div>
      <h2>Dealer cards: </h2>
      {hand.map((card: CardType, index: number) => {
        return index === 1 ? (
          <Card key={index} suit={card.suit} value={card.value} hidden={true} />
        ) : (
          <Card key={index} suit={card.suit} value={card.value} />
        );
      })}
    </div>
  );
}
