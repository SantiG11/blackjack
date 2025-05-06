import { useEffect, useRef, useState } from "react";
import CardDeck, { CardDeckHandle } from "./CardDeck";
import { CardType } from "./Card";
import Player from "./Player";
import Dealer from "./Dealer";
import calculateTotal from "../logic/score";
import GameOutcome from "./GameOutcome";
import GameButton from "./GameButton";
import Overlay from "./Overlay";

export type GameTurn = "player" | "dealer";

export enum GameState {
  "playing",

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

  const handleNewGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameState(GameState.playing);
    setTurn("player");

    if (deckRef.current) {
      deckRef.current.resetDeck();
    }

    startGame();
  };

  const checkWinner = (
    playerScore: number,
    dealerScore: number,
    playerHand: CardType[],
    dealerHand: CardType[]
  ) => {
    if (playerScore > 21) {
      console.log("player busts");
      return GameState.player_busts;
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

    if (dealerScore > 21) {
      console.log("dealer busts");
      return GameState.dealer_busts;
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

  //Game Starting
  useEffect(() => {
    startGame();
  }, []);

  //Check if player busts or gets Blackjack
  useEffect(() => {
    // Only perform these checks during the player's turn
    if (turn === "player") {
      // Check for player bust
      if (playerScore > 21) {
        setTurn("dealer"); // Player busts, turn goes to dealer
        // The game conclusion effect will handle setting the final state
      }
      // Check for player Blackjack (score is 21 and exactly 2 cards)
      if (playerScore === 21 && playerHand.length === 2) {
        setTurn("dealer"); // Player gets Blackjack, turn goes to dealer
        // The game conclusion effect will handle setting the final state
      }
    }
  }, [playerScore, playerHand, turn]);

  useEffect(() => {
    setPlayerScore(calculateTotal(playerHand));
    setDealerScore(calculateTotal(dealerHand));
  }, [playerHand, dealerHand]);

  useEffect(() => {
    if (
      turn === "dealer" &&
      (dealerScore >= 17 ||
        playerScore > 21 ||
        (playerScore === 21 && playerHand.length === 2))
    ) {
      // Now that the dealer's turn is complete, check the winner
      console.log(playerScore === 21 && playerHand.length === 2);
      const result = checkWinner(
        playerScore,
        dealerScore,
        playerHand,
        dealerHand
      );
      setGameState(result); // Set the final game state
      return;
    }

    if (turn === "dealer" && dealerScore < 17) {
      setTimeout(() => {
        hitDealer(); // Dealer hits
      }, 1000);
    }
  }, [dealerScore, turn]);

  return (
    <div className="flex flex-col justify-center ">
      <h1 className="font-extrabold text-5xl text-center">Blackjack Game</h1>

      <CardDeck ref={deckRef} />

      {gameState !== GameState.playing && <Overlay />}

      {gameState !== GameState.playing && (
        <GameOutcome
          gameState={gameState}
          playerScore={playerScore}
          dealerScore={dealerScore}
          handleNewGame={handleNewGame}
        />
      )}

      <div>
        <Dealer hand={dealerHand} turn={turn} score={dealerScore} />
      </div>

      <div className="flex flex-col gap-5 w-2xl  p-3">
        <Player hand={playerHand} score={playerScore} />

        <div className="flex justify-start w-2xs gap-3">
          <GameButton
            buttonText="Hit"
            disabled={turn === "dealer" || gameState === GameState.player_busts}
            action={hitPlayer}
          />

          <GameButton
            buttonText="Stand"
            disabled={turn === "dealer" || gameState === GameState.player_busts}
            action={handleStand}
          />
        </div>
      </div>
    </div>
  );
}

export default GameTable;
