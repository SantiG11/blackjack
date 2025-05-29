import { useEffect, useState } from "react";
import { GameState, Outcome } from "../utils/GameTypes";
import SecondaryButton from "../layout/SecondaryButton";

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
        setDetails(`Player Score: ${playerScore} Dealer Score: ${dealerScore}`);
        break;
      case GameState.dealer_wins_score: // Assuming you added this state
        setTitle("Dealer wins!!");
        setWinner("Dealer");
        setDetails(`Dealer Score: ${dealerScore} Player Score: ${playerScore}`);
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
    <div className="fixed inset-0 flex items-center justify-center z-100 ">
      <div
        className={`bg-[#1a1a1a]/80 backdrop-blur-2xl p-6 rounded-lg shadow-lg text-center z-100 w-3xs h-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          winner === "Player" && "border-4 border-green-500"
        } ${winner === "Dealer" && "border-4 border-[#aa3c3c]"} ${
          winner === "Tie" && "border-4 border-gray-600"
        }`}
      >
        <h3
          className={`text-2xl font-heading font-bold mb-4 ${
            winner === "Player" && " text-[#5caa7a]"
          }  ${winner === "Dealer" && " text-[#aa3c3c]"}`}
        >
          {title}
        </h3>
        <p className="text-lg font-body font-bold text-balance mb-6">
          {details}
        </p>

        <SecondaryButton
          buttonText="New Game"
          action={handleNewGame}
          textSize="text-sm"
        />
      </div>
    </div>
  );
}

export default GameOutcome;
