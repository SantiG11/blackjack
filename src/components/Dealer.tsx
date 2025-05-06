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
    <div className="flex flex-col gap-4 p-3">
      <ScoreDisplay
        score={
          turn === "dealer" ? score : score - calculateTotal([hand[1] ?? 0])
        }
      />
      <h2>Dealer cards: </h2>
      <div className=" flex gap-5 flex-wrap">
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
    </div>
  );
}
