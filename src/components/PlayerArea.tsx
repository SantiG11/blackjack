import Player from "./Player";
import PlayerControls from "./PlayerControls";
import { CardType } from "./Card";
import { GameTurn, GameState } from "./GameTable";

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
    <div className="flex flex-col gap-5 w-2xl p-3">
      <Player hand={playerHand} score={playerScore} />

      <PlayerControls
        turn={turn}
        gameState={gameState}
        hitPlayer={hitPlayer}
        handleStand={handleStand}
      />
    </div>
  );
}
