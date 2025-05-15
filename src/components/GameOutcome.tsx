import { useEffect, useState } from "react";
import { GameState, Outcome } from "../utils/GameTypes";

interface GameOutcomeProps {
  gameState: GameState;
  dealerScore: number;
  playerScore: number;
  handleNewGame: () => void;
}

function GameOutcome({
  gameState,
  dealerScore,
  playerScore,
  handleNewGame,
}: GameOutcomeProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [winner, setWinner] = useState<Outcome>("None");

  useEffect(() => {
    switch (gameState) {
      case GameState.player_busts:
        setTitle("Dealer wins!");
        setWinner("Dealer");
        setDetails(`Player busts`);
        break; // Add break after each case
      case GameState.dealer_busts: // You had player_busts twice, corrected this case
        setTitle("Player wins!");
        setWinner("Player");
        setDetails(`Dealer busts`);
        break;

      case GameState.tie_blackjack: // Assuming you added this state
        setTitle("Tie");
        setWinner("Tie");
        setDetails(`Player and Dealer Blackjack`);
        break;
      case GameState.player_wins_blackjack: // Assuming you added this state
        setTitle("Player wins!!");
        setWinner("Player");
        setDetails(`Player Blackjack`);
        break;
      case GameState.dealer_wins_blackjack: // Assuming you added this state
        setTitle("Dealer wins!!");
        setWinner("Dealer");
        setDetails(`Dealer Blackjack`);
        break;
      case GameState.player_wins_score: // Assuming you added this state
        setTitle("Player wins!!");
        setWinner("Player");
        setDetails(
          `Player Score: ${playerScore}, Dealer Score: ${dealerScore}`
        );
        break;
      case GameState.dealer_wins_score: // Assuming you added this state
        setTitle("Dealer wins!!");
        setWinner("Dealer");
        setDetails(
          `Dealer Score: ${dealerScore}, Player Score: ${playerScore}`
        );
        break;
      case GameState.tie_score: // Assuming you added this state
        setTitle("Tie");
        setWinner("Tie");
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
    <div
      className={`bg-white p-6 rounded-lg shadow-lg text-center z-100 w-sm h-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        winner === "Player" && "border-4 border-green-500"
      } ${winner === "Dealer" && "border-4 border-red-600"} ${
        winner === "Tie" && "border-4 border-gray-400"
      }`}
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-lg mb-6">{details}</p>
      <button
        onClick={handleNewGame}
        className="hover:cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
      >
        New Game
      </button>
    </div>
  );
}

export default GameOutcome;
