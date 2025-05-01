import { useEffect, useState } from "react";
import { GameState } from "./GameTable";

interface GameOutcomeProps {
  gameState: GameState;
  dealerScore: number;
  playerScore: number;
}

function GameOutcome({
  gameState,
  dealerScore,
  playerScore,
}: GameOutcomeProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    switch (gameState) {
      case GameState.player_busts:
        setTitle("Dealer wins!");
        setDetails(`Player busts`);
        break; // Add break after each case
      case GameState.dealer_busts: // You had player_busts twice, corrected this case
        setTitle("Player wins!");
        setDetails(`Dealer busts`);
        break;

      case GameState.tie_blackjack: // Assuming you added this state
        setTitle("Tie");
        setDetails(`Player and Dealer Blackjack`);
        break;
      case GameState.player_wins_blackjack: // Assuming you added this state
        setTitle("Player wins!!");
        setDetails(`Player Blackjack`);
        break;
      case GameState.dealer_wins_blackjack: // Assuming you added this state
        setTitle("Dealer wins!!");
        setDetails(`Dealer Blackjack`);
        break;
      case GameState.player_wins_score: // Assuming you added this state
        setTitle("Player wins!!");
        setDetails(
          `Player Score: ${playerScore}, Dealer Score: ${dealerScore}`
        );
        break;
      case GameState.dealer_wins_score: // Assuming you added this state
        setTitle("Dealer wins!!");
        setDetails(
          `Dealer Score: ${dealerScore}, Player Score: ${playerScore}`
        );
        break;
      case GameState.tie_score: // Assuming you added this state
        setTitle("Tie");
        setDetails(
          `Dealer Score: ${dealerScore}, Player Score: ${playerScore}`
        );
        break;
      // Consider adding a default case or handling ongoing game states
      default:
        setTitle("");
        setDetails("");
        break;
    }
  }, [gameState, playerScore, dealerScore]);

  return (
    <div>
      <h3>{title}</h3>
      <p>{details}</p>
    </div>
  );
}

export default GameOutcome;
