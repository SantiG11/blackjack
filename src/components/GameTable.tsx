import { useEffect, useRef, useState } from "react";
import CardDeck, { CardDeckHandle } from "./CardDeck";
import { CardType } from "./Card";
import Player from "./Player";
import Dealer from "./Dealer";
import calculateTotal from "../logic/score";
import ScoreDisplay from "./ScoreDisplay";

function GameTable() {
  const deckRef = useRef<CardDeckHandle | null>(null);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);

  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

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
        <ScoreDisplay score={playerScore} />
        <Player hand={playerHand} />
        <button
          onClick={() => {
            hitPlayer();
          }}
        >
          Hit Player
        </button>
        <button
          onClick={() => {
            hitDealer();
          }}
        >
          Hit Dealer
        </button>
        <button>Stand</button>
      </div>

      <div>
        <ScoreDisplay score={dealerScore} />
        <Dealer hand={dealerHand} />
      </div>
    </div>
  );
}

export default GameTable;
