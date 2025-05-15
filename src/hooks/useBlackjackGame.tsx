//This hook contains all the states and effects necessary for the blackjack game

import {
  DEALER_STAND_VALUE,
  BLACKJACK_SCORE,
  INITIAL_DEAL_COUNT,
  BLACKJACK_HAND_SIZE,
  BLACKJACK_PAYOUT_MULTIPLIER,
  STANDARD_PAYOUT_MULTIPLIER,
  PUSH_PAYOUT_MULTIPLIER,
  ADD_MONEY_AMOUNT,
} from "../utils/GameConstants";

import { useEffect, useRef, useState } from "react";

import { BetCoin, GameState, GameTurn, CardType } from "../utils/GameTypes";
import { CardDeckHandle } from "../components/CardDeck";
import calculateTotal from "../logic/score";

export function useBlackjackGame() {
  const deckRef = useRef<CardDeckHandle | null>(null); // Ref for the card deck component methods
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [gameState, setGameState] = useState(GameState.betting);

  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const [turn, setTurn] = useState<GameTurn>("player");

  const [moves, setMoves] = useState(0);

  //---------- Betting ----------------
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

  const handleBet = (money: BetCoin) => {
    if (playerMoney >= money) {
      setCurrentBet((prevState) => prevState + money);
    } else {
      alert("Not enough money!");
    }
  };

  const handleAddMoney = () => {
    setPlayerMoney((prevMoney) => prevMoney + ADD_MONEY_AMOUNT);
  };

  const handleResetMoney = () => {
    setPlayerMoney(0);
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

  //------------- Gaming Actions --------------

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
      hitPlayer(INITIAL_DEAL_COUNT);
      hitDealer(INITIAL_DEAL_COUNT);
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

  //------------- Game Logic ---------------

  const checkWinner = (
    playerScore: number,
    dealerScore: number,
    playerHand: CardType[],
    dealerHand: CardType[]
  ) => {
    if (playerScore > BLACKJACK_SCORE) {
      return GameState.player_busts;
    }

    const isPlayerBlackjack =
      playerScore === BLACKJACK_SCORE &&
      playerHand.length === BLACKJACK_HAND_SIZE;
    const isDealerBlackjack =
      dealerScore === BLACKJACK_SCORE &&
      dealerHand.length === BLACKJACK_HAND_SIZE;

    if (isPlayerBlackjack && isDealerBlackjack) {
      return GameState.tie_blackjack; // Both get Blackjack is a push
    }

    if (isPlayerBlackjack && turn === "dealer" && !isDealerBlackjack) {
      return GameState.player_wins_blackjack; // Player Blackjack wins
    }

    if (dealerScore > BLACKJACK_SCORE) {
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

  //------------- Effects -------------------

  // Initial setup on mount
  useEffect(() => {
    handleNewGame();
  }, []);

  // Save player money to local storage
  useEffect(() => {
    localStorage.setItem("playerMoney", String(playerMoney));
  }, [playerMoney]);

  //Check if player busts or gets Blackjack
  useEffect(() => {
    // Only perform these checks during the player's turn
    if (turn === "player") {
      // Check for player bust
      if (playerScore > BLACKJACK_SCORE) {
        setTurn("dealer"); // Player busts, turn goes to dealer
        // The game conclusion effect will handle setting the final state
      }
      // Check for player Blackjack (score is 21 and exactly 2 cards)
      if (
        playerScore === BLACKJACK_SCORE &&
        playerHand.length === BLACKJACK_HAND_SIZE
      ) {
        setTurn("dealer"); // Player gets Blackjack, turn goes to dealer
        // The game conclusion effect will handle setting the final state
      }
    }
  }, [playerScore, playerHand, turn]);

  // Update Scores
  useEffect(() => {
    setPlayerScore(calculateTotal(playerHand));
    setDealerScore(calculateTotal(dealerHand));
    setMoves((prev) => prev + 1);
  }, [playerHand, dealerHand]);

  // Dealer turn logic and game conclusion
  useEffect(() => {
    const gameConcluded =
      turn === "dealer" &&
      (dealerScore >= DEALER_STAND_VALUE ||
        playerScore > BLACKJACK_SCORE ||
        (playerScore === BLACKJACK_SCORE &&
          playerHand.length === BLACKJACK_HAND_SIZE));

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
          winnings = currentBet * STANDARD_PAYOUT_MULTIPLIER; // Win 1:1
          returnBet = true;
          break;

        case GameState.dealer_busts: // Player wins when dealer busts (1:1 payout)
          winnings = currentBet * STANDARD_PAYOUT_MULTIPLIER;
          returnBet = true;
          break;
        case GameState.tie_score:
        case GameState.tie_blackjack:
          winnings = PUSH_PAYOUT_MULTIPLIER;
          returnBet = true; // Return original bet on a push
          break;
        case GameState.player_busts: // Player loses bet
        case GameState.dealer_wins_score: // Player loses bet
        case GameState.dealer_wins_blackjack: // Player loses bet
          // Bet was already deducted. No winnings or bet returned.
          break;
        // Add other cases if needed
        case GameState.player_wins_blackjack:
          winnings = currentBet * BLACKJACK_PAYOUT_MULTIPLIER; // Win 3:2
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

    if (turn === "dealer" && dealerScore < DEALER_STAND_VALUE) {
      setTimeout(() => {
        hitDealer();
      }, 1000);
    }
  }, [dealerScore, turn, gameState, playerScore, playerHand, moves]);

  return {
    // State
    playerHand,
    dealerHand,
    gameState,
    playerScore,
    dealerScore,
    turn,
    playerMoney,
    currentBet,
    deckRef, // Include the ref if components need access (e.g., CardDeck component)

    // Actions/Functions
    handleBet,
    handleAddMoney,
    handleResetMoney,
    handleBetAndDeal,
    handleResetBet,
    hitPlayer,
    handleStand,
    handleNewGame,
    // No need to return checkWinner, hitDealer, startGame, as they are internal logic
  };
}
