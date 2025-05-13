import CardDeck from "./CardDeck";

import Dealer from "./Dealer";

import GameOutcome from "./GameOutcome";

import Overlay from "./Overlay";

import GameMessage from "./GameMessage";
import BettingControls from "./BettingControls";

import PlayerMoneyControls from "./PlayerMoneyControls";
import PlayerArea from "./PlayerArea";

import { MINIMUM_BET_CHECK } from "../utils/GameConstans";

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

import { useBlackjackGame } from "../hooks/useBlackjackGame";

function GameTable() {
  const {
    playerHand,
    dealerHand,
    gameState,
    playerScore,
    dealerScore,
    turn,
    playerMoney,
    currentBet,
    deckRef, // Get the ref from the hook

    // Get actions/functions from the hook
    handleBet,
    handleAddMoney,
    handleResetMoney,
    handleBetAndDeal,
    handleResetBet,
    hitPlayer,
    handleStand,
    handleNewGame,
  } = useBlackjackGame();

  return (
    <div className="flex flex-col justify-center ">
      <h1 className="font-extrabold text-5xl text-center">Blackjack Game</h1>

      {/*----------- Card Deck ----------- */}
      <CardDeck ref={deckRef} />

      {/*----------- Game state and messages ----------- */}

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

      {playerMoney < MINIMUM_BET_CHECK && gameState === GameState.betting && (
        <Overlay />
      )}
      {playerMoney < MINIMUM_BET_CHECK && gameState === GameState.betting && (
        <GameMessage
          message="You must add money to play"
          action={handleAddMoney}
          btnName="Add money (+500)"
        />
      )}

      {/*----------- Dealer ----------- */}

      <div>
        <Dealer
          hand={dealerHand}
          turn={gameState === GameState.betting ? "dealer" : turn}
          score={dealerScore}
        />
      </div>

      {/*----------- Player ----------- */}

      <PlayerArea
        playerHand={playerHand}
        playerScore={playerScore}
        turn={turn}
        gameState={gameState} // Pass gameState for disabling logic in PlayerControls
        hitPlayer={hitPlayer}
        handleStand={handleStand}
      />

      {/*----------- Betting ----------- */}

      <BettingControls
        currentBet={currentBet}
        playerMoney={playerMoney}
        gameState={gameState}
        coins={Coins}
        handleBet={handleBet}
        handleResetBet={handleResetBet}
        handleBetAndDeal={handleBetAndDeal}
      />

      <PlayerMoneyControls
        playerMoney={playerMoney}
        handleAddMoney={handleAddMoney}
        handleResetMoney={handleResetMoney}
      />
    </div>
  );
}

export default GameTable;
