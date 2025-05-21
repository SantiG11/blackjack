import { GameSection } from "../layout/GameSection";
import { CardType, GameState, GameTurn } from "../utils/GameTypes";
import Player from "./Player";
import PlayerControls from "./PlayerControls";

interface PlayerAreaProps {
  playerHand: CardType[];
  playerScore: number;
  turn: GameTurn;
  gameState: GameState;
  hitPlayer: () => void;
  handleStand: () => void;
}

export default function PlayerArea({
  playerHand,
  playerScore,
  turn,
  gameState,
  hitPlayer,
  handleStand,
}: PlayerAreaProps) {
  return (
    <GameSection>
      <Player hand={playerHand} score={playerScore} />

      <PlayerControls
        turn={turn}
        gameState={gameState}
        hitPlayer={hitPlayer}
        handleStand={handleStand}
      />
    </GameSection>
  );
}
