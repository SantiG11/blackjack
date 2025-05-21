import { CardsContainer } from "../layout/CardsContainer";
import { CardType } from "../utils/GameTypes";
import Card from "./Card";
import ScoreDisplay from "./ScoreDisplay";

interface PlayerProps {
  hand: CardType[]; // Let's call the prop 'hand'
  score: number;
}

export default function Player({ hand, score }: PlayerProps) {
  return (
    <>
      <ScoreDisplay score={score} player="Player" />

      <CardsContainer>
        {hand.map((card: CardType, index: number) => {
          return <Card key={index} suit={card.suit} value={card.value} />;
        })}
      </CardsContainer>
    </>
  );
}
