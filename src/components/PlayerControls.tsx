import { ButtonsContainer } from "../layout/ButtonsContainer";
import { GameState, GameTurn } from "../utils/GameTypes";
import GameButton from "../layout/GameButton";

interface PlayerControlsProps {
  turn: GameTurn;
  gameState: GameState;
  hitPlayer: () => void;
  handleStand: () => void;
}

export default function PlayerControls({
  turn,
  gameState,
  hitPlayer,
  handleStand,
}: PlayerControlsProps) {
  const isPlayerTurn = turn === "player";
  const isGamePlaying = gameState === GameState.playing;
  const playerBusted = gameState === GameState.player_busts;

  const buttonDisabled = !isPlayerTurn || !isGamePlaying || playerBusted;

  return (
    <ButtonsContainer>
      <GameButton
        buttonText="Hit"
        disabled={buttonDisabled}
        action={hitPlayer}
      />

      <GameButton
        buttonText="Stand"
        disabled={buttonDisabled}
        action={handleStand}
        bg="#FF0000"
      />
    </ButtonsContainer>
  );
}
