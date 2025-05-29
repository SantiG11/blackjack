import CardDeck from "./CardDeck";

import Dealer from "./Dealer";

import GameOutcome from "./GameOutcome";

import Overlay from "./Overlay";

import GameMessage from "./GameMessage";
import BettingControls from "./BettingControls";

import PlayerMoneyControls from "./PlayerMoneyControls";
import PlayerArea from "./PlayerArea";

import { MINIMUM_BET_CHECK, Coins } from "../utils/GameConstants";
import { GameState } from "../utils/GameTypes";

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
    <div className="flex flex-col flex-1 justify-around  min-h-[95vh] md:min-h-fit  md:min-h-50vh md:max-w-[1600px] md:max-h-[800px] md:h-[80vh]  2xl:justify-start 2xl:gap-10 text-white bg-[#0a3c28] rounded-xl border-4 sm:border-8 border-[#2a1a12] shadow-2xl p-2 sm:p-6 md:px-4 md:py-2 relative ">
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
          btnName="Add $500"
        />
      )}

      {/*----------- Header ----------- */}

      <header className="flex flex-row justify-between items-center 2xl:m-2 mb-4 md:mb-0 ">
        <h1 className="font-bold text-3xl ">Blackjack</h1>

        <PlayerMoneyControls
          playerMoney={playerMoney}
          handleAddMoney={handleAddMoney}
          handleResetMoney={handleResetMoney}
          dropdown={gameState === GameState.betting}
        />
      </header>

      {/*----------- Dealer ----------- */}

      <Dealer
        hand={dealerHand}
        turn={gameState === GameState.betting ? "dealer" : turn}
        score={dealerScore}
      />

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
    </div>
  );
}

export default GameTable;
