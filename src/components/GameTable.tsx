import { useEffect, useRef, useState } from "react";
import CardDeck, { CardDeckHandle } from "./CardDeck";
import { CardType } from "./Card";
import Player from "./Player";
import Dealer from "./Dealer";
import calculateTotal from "../logic/score";
import GameOutcome from "./GameOutcome";

export type GameTurn = "player" | "dealer";

export enum GameState {
  "playing",
  "tie_bust",
  "player_busts",
  "dealer_busts",

  "tie_score",
  "tie_blackjack",

  "finished_game",

  "player_wins_score",
  "dealer_wins_score",

  "player_wins_blackjack",
  "dealer_wins_blackjack",
}

function GameTable() {
  const deckRef = useRef<CardDeckHandle | null>(null);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [gameState, setGameState] = useState(GameState.playing);

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
      console.log(dealerScore);
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

  const dealerTurn = () => {
    if (dealerScore >= 17 || dealerScore > 21) {
      console.log("Dealer's final score: " + dealerScore);
      // Now that the dealer's turn is over, check the winner
      const result = checkWinner(
        playerScore,
        dealerScore,
        playerHand,
        dealerHand
      );
      setGameState(result); // Set the game state based on the winner
      return; // Dealer stands or busts
    }
    hitDealer();
  };

  const checkWinner = (
    playerScore: number,
    dealerScore: number,
    playerHand: CardType[],
    dealerHand: CardType[]
  ) => {
    if (playerScore > 21 && dealerScore > 21) {
      console.log("player and dealer busts");
      return GameState.tie_bust;
    }

    if (playerScore > 21) {
      console.log("player busts");
      return GameState.player_busts;
    }

    if (dealerScore > 21) {
      console.log("dealer busts");
      return GameState.dealer_busts;
    }

    const isPlayerBlackjack = playerScore === 21 && playerHand.length === 2;
    const isDealerBlackjack = dealerScore === 21 && dealerHand.length === 2;

    if (isPlayerBlackjack && isDealerBlackjack) {
      console.log("Push (Blackjack)");
      return GameState.tie_blackjack; // Both get Blackjack is a push
    }

    if (isPlayerBlackjack) {
      console.log("Player gets Blackjack!");
      return GameState.player_wins_blackjack; // Player Blackjack wins
    }

    if (isDealerBlackjack) {
      console.log("Dealer gets Blackjack!");
      return GameState.dealer_wins_blackjack; // Dealer Blackjack wins
    }

    if (dealerScore > playerScore) {
      console.log("Dealer wins by score");
      return GameState.dealer_wins_score; // Dealer has higher score
    }

    if (playerScore > dealerScore) {
      console.log("Player wins by score");
      return GameState.player_wins_score; // Player has higher score
    }

    // If scores are equal (and no Blackjack tie)
    console.log("Push (by score)");
    return GameState.tie_score;
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (playerScore > 21) {
      setTurn("dealer");
    }
  }, [playerScore]);

  useEffect(() => {
    setPlayerScore(calculateTotal(playerHand));
    setDealerScore(calculateTotal(dealerHand));
  }, [playerHand, dealerHand]);

  useEffect(() => {
    setTimeout(() => {
      if (turn === "dealer") {
        dealerTurn();
      }
    }, 1000);
  }, [turn, dealerScore]);

  return (
    <div>
      <h2>Blackjack Game</h2>

      <CardDeck ref={deckRef} />

      {gameState !== GameState.playing && (
        <GameOutcome
          gameState={gameState}
          playerScore={playerScore}
          dealerScore={dealerScore}
        />
      )}

      <div>
        <Player hand={playerHand} score={playerScore} />
        <button
          onClick={() => {
            hitPlayer();
          }}
          disabled={turn === "dealer" || gameState === GameState.player_busts}
        >
          Hit Player
        </button>

        <button
          onClick={handleStand}
          disabled={turn === "dealer" || gameState === GameState.player_busts}
        >
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
