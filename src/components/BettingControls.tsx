import GameButton from "../layout/GameButton";
import { GameState } from "../utils/GameTypes";
import { BetCoin } from "../utils/GameTypes";
import { GameSection } from "../layout/GameSection";
import ValueText from "../layout/ValueText";
import { ButtonsContainer } from "../layout/ButtonsContainer";
import { Coin } from "./Coin";

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
    <div
      className=" md:absolute md:right-0  md:bottom-0 bg-[#1a1a1a]/60 backdrop-blur-sm  rounded-lg shadow-lg md:m-2  py-2
      "
    >
      <GameSection>
        <ValueText text="Current bet: " value={"$" + currentBet} />

        <ButtonsContainer>
          {coins.map((coin, index) => (
            <Coin
              value={coin}
              key={index}
              disabled={
                gameState !== GameState.betting ||
                playerMoney < currentBet + coin
              }
              action={() => handleBet(coin)}
            />
          ))}
        </ButtonsContainer>

        <ButtonsContainer>
          <GameButton
            buttonText="Deal cards"
            disabled={
              gameState !== GameState.betting ||
              currentBet === 0 ||
              playerMoney < currentBet
            }
            action={handleBetAndDeal}
          />

          <GameButton
            buttonText="Clear Bet"
            disabled={gameState !== GameState.betting || currentBet === 0}
            action={handleResetBet}
            bg="bg-[#FF0000]"
          />
        </ButtonsContainer>
      </GameSection>
    </div>
  );
}
