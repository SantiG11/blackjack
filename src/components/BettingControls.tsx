import GameButton from "../layout/GameButton";
import { GameState } from "../utils/GameTypes";
import { BetCoin } from "../utils/GameTypes";
import { GameSection } from "../layout/GameSection";
import ValueText from "../layout/ValueText";
import { ButtonsContainer } from "../layout/ButtonsContainer";

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
    <GameSection>
      <ValueText text="Current bet: " value={"$" + currentBet} />

      <ButtonsContainer>
        {coins.map((coin) => (
          <GameButton
            buttonText={`$${coin}`}
            disabled={
              gameState !== GameState.betting || playerMoney < currentBet + coin
            }
            action={() => handleBet(coin)}
          />
        ))}
      </ButtonsContainer>

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
    </GameSection>
  );
}
