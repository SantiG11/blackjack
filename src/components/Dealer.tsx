import calculateTotal from "../logic/score";
import Card, { CardType } from "./Card";
import { GameTurn } from "./GameTable";
import ScoreDisplay from "./ScoreDisplay";

interface DealerProps {
  hand: CardType[]; // Let's call the prop 'hand'
  turn: GameTurn;
  score: number;
}

export default function Dealer({ hand, turn, score }: DealerProps) {
  return (
    <div>
      <ScoreDisplay
        score={
          turn === "dealer" ? score : score - calculateTotal([hand[1] ?? 0])
        }
      />
      <h2>Dealer cards: </h2>
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
    </div>
  );
}
