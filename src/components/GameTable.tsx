import { useEffect, useRef, useState } from "react";
import CardDeck, { CardDeckHandle } from "./CardDeck";
import { CardType } from "./Card";
import Player from "./Player";
import Dealer from "./Dealer";
import calculateTotal from "../logic/score";
import GameOutcome from "./GameOutcome";
import GameButton from "./GameButton";
import Overlay from "./Overlay";
import PlayerMoney from "./PlayerMoney";
import GameMessage from "./GameMessage";

export type GameTurn = "player" | "dealer";

export type BetCoin = 2.5 | 5 | 10 | 25 | 50 | 100;

const Coins: BetCoin[] = [2.5, 5, 10, 25, 50, 100];

export enum GameState {
  "playing",
  "betting",

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
  const [gameState, setGameState] = useState(GameState.betting);

  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const [turn, setTurn] = useState<GameTurn>("player");

  //Betting
  const [playerMoney, setPlayerMoney] = useState(() => {
    const storedMoney = localStorage.getItem("playerMoney");
    if (storedMoney !== null) {
      const parsedMoney = Number(storedMoney); // Parse to number if it's stored as a string

      if (!isNaN(parsedMoney)) {
        return parsedMoney; // Use the stored value if it's a valid number
      }
    }
    return 0;
  });
  const [currentBet, setCurrentBet] = useState(0);

  const handleBet = (money: number) => {
    if (playerMoney >= money) {
      setCurrentBet((prevState) => prevState + money);
    } else {
      alert("Not enough money!");
    }
  };

  const handleAddMoney = () => {
    setPlayerMoney((prevMoney) => prevMoney + 500);
  };

  const handleBetAndDeal = () => {
    if (currentBet === 0) {
      alert("Please place a bet!");
      return;
    }

    if (playerMoney < currentBet) {
      alert("You don't have enough money for this bet!");
      return;
    }

    setPlayerMoney((prevMoney) => prevMoney - currentBet);

    // Start the game (deal cards)
    startGame(); // startGame will deal cards if currentBet > 0
  };

  const handleResetBet = () => {
    setCurrentBet(0);
  };

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
    // setTimeout(() => {
    if (deckRef.current) {
      const newCard = deckRef.current.dealCard(times);
      if (newCard) {
        setDealerHand((prevHand) => [...prevHand, ...newCard]);
      }
    }
    // }, 20);
  };

  const handleStand = () => {
    setTurn("dealer");
  };

  const startGame = () => {
    if (currentBet > 0) {
      hitPlayer(2);
      hitDealer(2);
      // setTimeout(() => {
      setGameState(GameState.playing);
      // }, 20);
    } else {
      alert("Place a bet before playing");
    }
  };

  const handleNewGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameState(GameState.betting);
    setTurn("player");
    setCurrentBet(0);

    if (deckRef.current) {
      deckRef.current.resetDeck();
    }
  };

  const checkWinner = (
    playerScore: number,
    dealerScore: number,
    playerHand: CardType[],
    dealerHand: CardType[]
  ) => {
    if (playerScore > 21) {
      return GameState.player_busts;
    }

    const isPlayerBlackjack = playerScore === 21 && playerHand.length === 2;
    const isDealerBlackjack = dealerScore === 21 && dealerHand.length === 2;

    if (isPlayerBlackjack && isDealerBlackjack) {
      return GameState.tie_blackjack; // Both get Blackjack is a push
    }

    if (isPlayerBlackjack && turn === "dealer" && !isDealerBlackjack) {
      return GameState.player_wins_blackjack; // Player Blackjack wins
    }

    if (dealerScore > 21) {
      return GameState.dealer_busts;
    }

    if (isDealerBlackjack) {
      return GameState.dealer_wins_blackjack; // Dealer Blackjack wins
    }

    if (dealerScore > playerScore) {
      return GameState.dealer_wins_score; // Dealer has higher score
    }

    if (playerScore > dealerScore) {
      return GameState.player_wins_score; // Player has higher score
    }

    // If scores are equal (and no Blackjack tie)

    return GameState.tie_score;
  };

  useEffect(() => {
    handleNewGame();
  }, []);

  useEffect(() => {
    localStorage.setItem("playerMoney", String(playerMoney));
  }, [playerMoney]);

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
    setMoves((prev) => prev + 1);
  }, [playerHand, dealerHand]);

  useEffect(() => {
    const gameConcluded =
      turn === "dealer" &&
      (dealerScore >= 17 ||
        playerScore > 21 ||
        (playerScore === 21 && playerHand.length === 2));

    if (gameConcluded) {
      // Now that the dealer's turn is complete, check the winner

      const result = checkWinner(
        playerScore,
        dealerScore,
        playerHand,
        dealerHand
      );
      setGameState(result); // Set the final game state

      let winnings = 0; // Only track the amount won (excluding the original bet)
      let returnBet = false; // Flag to indicate if the original bet should be returned

      switch (result) {
        case GameState.player_wins_score:
          winnings = currentBet; // Win 1:1
          returnBet = true;
          break;

        case GameState.dealer_busts: // Player wins when dealer busts (1:1 payout)
          winnings = currentBet;
          returnBet = true;
          break;
        case GameState.tie_score:
        case GameState.tie_blackjack:
          winnings = 0;
          returnBet = true; // Return original bet on a push
          break;
        case GameState.player_busts: // Player loses bet
        case GameState.dealer_wins_score: // Player loses bet
        case GameState.dealer_wins_blackjack: // Player loses bet
          // Bet was already deducted. No winnings or bet returned.
          break;
        // Add other cases if needed
        case GameState.player_wins_blackjack:
          winnings = currentBet * 1.5; // Win 3:2
          returnBet = true;
          break;
      }

      // Adjust player money based on winnings and returned bet
      if (returnBet) {
        setPlayerMoney((prevMoney) => prevMoney + currentBet); // Return the original bet
      }
      if (winnings > 0) {
        setPlayerMoney((prevMoney) => prevMoney + winnings); // Add the winnings
      }

      // Reset currentBet after payout
      setCurrentBet(0);
      return;
    }

    if (turn === "dealer" && dealerScore < 17) {
      setTimeout(() => {
        hitDealer();
      }, 1000);
    }
  }, [dealerScore, turn, gameState, playerScore, playerHand, moves]);

  return (
    <div className="flex flex-col justify-center ">
      <h1 className="font-extrabold text-5xl text-center">Blackjack Game</h1>

      <CardDeck ref={deckRef} />

      {gameState !== GameState.playing && gameState !== GameState.betting && (
        <Overlay />
      )}

      {gameState !== GameState.playing && gameState !== GameState.betting && (
        <GameOutcome
          gameState={gameState}
          playerScore={playerScore}
          dealerScore={dealerScore}
          handleNewGame={handleNewGame}
        />
      )}

      {playerMoney < 2.5 && gameState === GameState.betting && <Overlay />}
      {playerMoney < 2.5 && gameState === GameState.betting && (
        <GameMessage
          message="You must add money to play"
          action={handleAddMoney}
          btnName="Add money (+500)"
        />
      )}

      <div>
        <Dealer
          hand={dealerHand}
          turn={gameState === GameState.betting ? "dealer" : turn}
          score={dealerScore}
        />
      </div>

      <div className="flex flex-col gap-5 w-2xl  p-3">
        <Player hand={playerHand} score={playerScore} />

        <div className="flex justify-start w-2xs gap-3">
          <GameButton
            buttonText="Hit"
            disabled={
              turn === "dealer" ||
              gameState === GameState.player_busts ||
              gameState === GameState.betting
            }
            action={hitPlayer}
          />

          <GameButton
            buttonText="Stand"
            disabled={
              turn === "dealer" ||
              gameState === GameState.player_busts ||
              gameState === GameState.betting
            }
            action={handleStand}
          />
        </div>
      </div>

      <p>Bet: {currentBet}</p>

      <div className="flex gap-3 m-2">
        {Coins.map((coin) => (
          <GameButton
            buttonText={`$${coin}`}
            disabled={
              gameState !== GameState.betting || playerMoney < currentBet + coin
            }
            action={() => handleBet(coin)}
          />
        ))}
      </div>
      <div className="flex gap-3 m-2">
        <GameButton
          buttonText="Clear Bet"
          disabled={gameState !== GameState.betting}
          action={handleResetBet}
        />

        <GameButton
          buttonText="Deal cards"
          disabled={
            gameState !== GameState.betting ||
            currentBet === 0 ||
            playerMoney < currentBet
          }
          action={handleBetAndDeal}
        />
      </div>

      <PlayerMoney money={playerMoney} />
      <button
        onClick={handleAddMoney}
        className="hover:cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors w-40 my-1"
      >
        Add money (+500)
      </button>
      <button
        onClick={() => setPlayerMoney(0)}
        className="hover:cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors w-40 my-1"
      >
        Reset money
      </button>
    </div>
  );
}

export default GameTable;
