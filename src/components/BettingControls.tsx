import GameButton from "./GameButton"; // Assuming GameButton is in the same directory
import { GameState } from "../utils/GameTypes"; // Import GameState enum
import { BetCoin } from "../utils/GameTypes";

interface BettingControlsProps {
  currentBet: number;
  playerMoney: number;
  gameState: GameState;
  coins: BetCoin[];
  handleBet: (money: BetCoin) => void;
  handleResetBet: () => void;
  handleBetAndDeal: () => void;
}

// const Coins: BetCoin[] = [2.5, 5, 10, 25, 50, 100];

export default function BettingControls({
  currentBet,
  playerMoney,
  gameState,
  coins,
  handleBet,
  handleResetBet,
  handleBetAndDeal,
}: BettingControlsProps) {
  //   const isBettingPhase = gameState === GameState.betting;

  return (
    <div className="flex flex-col items-start m-2 p-2 gap-2">
      <p className="text-xl font-semibold mb-2">Bet: {currentBet}</p>

      <div className="flex gap-3 ">
        {coins.map((coin) => (
          <GameButton
            buttonText={`$${coin}`}
            disabled={
              gameState !== GameState.betting || playerMoney < currentBet + coin
            }
            action={() => handleBet(coin)}
          />
        ))}
      </div>

      <div className="flex gap-3 ">
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
    </div>
  );
}
