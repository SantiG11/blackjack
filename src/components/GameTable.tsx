import { useEffect, useRef, useState } from "react";
import CardDeck, { CardDeckHandle } from "./CardDeck";
import { CardType } from "./Card";
import Player from "./Player";
import Dealer from "./Dealer";
import calculateTotal from "../logic/score";

export type GameTurn = "player" | "dealer";

function GameTable() {
  const deckRef = useRef<CardDeckHandle | null>(null);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);

  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const [turn, setTurn] = useState<GameTurn>("player");

  const hitPlayer = (times: number = 1) => {
    setTimeout(() => {
      if (deckRef.current) {
        const newCard = deckRef.current.dealCard(times);
        if (newCard) {
          setPlayerHand((prevHand) => [...prevHand, ...newCard]);
        }
      }
    }, 1);
  };

  const hitDealer = (times: number = 1) => {
    setTimeout(() => {
      if (deckRef.current) {
        const newCard = deckRef.current.dealCard(times);
        if (newCard) {
          setDealerHand((prevHand) => [...prevHand, ...newCard]);
        }
      }
    }, 20);
  };

  const handleStand = () => {
    setTurn("dealer");
    console.log("Player stands. Dealer's turn.");
  };

  const startGame = () => {
    hitPlayer(2);
    hitDealer(2);
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    setPlayerScore(calculateTotal(playerHand));
    setDealerScore(calculateTotal(dealerHand));
  }, [playerHand, dealerHand]);

  return (
    <div>
      <h2>Blackjack Game</h2>

      <CardDeck ref={deckRef} />

      <div>
        <Player hand={playerHand} score={playerScore} />
        <button
          onClick={() => {
            hitPlayer();
          }}
          disabled={turn === "dealer"}
        >
          Hit Player
        </button>

        <button onClick={handleStand} disabled={turn === "dealer"}>
          Stand
        </button>
      </div>

      <div>
        <Dealer hand={dealerHand} turn={turn} score={dealerScore} />
      </div>
    </div>
  );
}

export default GameTable;
