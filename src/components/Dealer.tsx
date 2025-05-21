import { CardsContainer } from "../layout/CardsContainer";
import { GameSection } from "../layout/GameSection";
import calculateTotal from "../logic/score";
import { CardType, GameTurn } from "../utils/GameTypes";
import Card from "./Card";
import ScoreDisplay from "./ScoreDisplay";

interface DealerProps {
  hand: CardType[]; // Let's call the prop 'hand'
  turn: GameTurn;
  score: number;
}

export default function Dealer({ hand, turn, score }: DealerProps) {
  return (
    <GameSection>
      <ScoreDisplay
        score={
          turn === "dealer" ? score : score - calculateTotal([hand[1] ?? 0])
        }
        player="Dealer"
      />

      <CardsContainer>
        {hand.map((card: CardType, index: number) => {
          const isHidden = index === 1 && turn === "player";
          return (
            <Card
              key={index}
              suit={card.suit}
              value={card.value}
              hidden={isHidden}
            />
          );
        })}
      </CardsContainer>
    </GameSection>
  );
}
