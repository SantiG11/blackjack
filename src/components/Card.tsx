import { CardType, Suit } from "../utils/GameTypes";

export default function Card({ suit, value, hidden = false }: CardType) {
  const suitSymbol = (suit: Suit) => {
    let simbol = "";

    switch (suit) {
      case "Clubs":
        simbol = "♣"; // Light teal
        break;
      case "Diamonds":
        simbol = "♦"; // Steel blue
        break;
      case "Spades":
        simbol = "♠"; // Navy blue
        break;
      case "Hearts":
        simbol = "♥"; // Sandy orange
        break;
    }
    return simbol;
  };
  const suitColor = ["hearts", "diamonds"].includes(suit)
    ? "text-[#aa3c3c]"
    : "text-[#1a1a1a]";

  return hidden ? (
    <div className="w-[70px] h-[98px] sm:w-[85px] sm:h-[119px] md:w-[100px] md:h-[140px] rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#333333] shadow-xl flex items-center justify-center p-1 transform transition-transform hover:rotate-1 hover:scale-105">
      <div className="w-full h-full rounded bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
          <div className="w-full h-full rounded-full border-4 border-dashed border-[#333333] animate-spin-slow"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-[70px] h-[98px] sm:w-[85px] sm:h-[119px] md:w-[100px] md:h-[140px] rounded-lg bg-[#f8f8f8] shadow-xl flex flex-col p-2 sm:p-3 transform transition-transform hover:rotate-1 hover:scale-105 border border-[#e0e0e0]">
      <div className="flex justify-between items-start">
        <div
          className={`text-sm sm:text-base md:text-lg font-bold ${suitColor}`}
        >
          {value}
        </div>
        <div className={`text-sm sm:text-base md:text-lg ${suitColor}`}>
          {suitSymbol(suit)}
        </div>
      </div>
      <div
        className={`flex-grow flex items-center justify-center text-2xl sm:text-3xl md:text-4xl ${suitColor}`}
      >
        {suitSymbol(suit)}
      </div>
      <div className="flex justify-between items-end rotate-180">
        <div
          className={`text-sm sm:text-base md:text-lg font-bold ${suitColor}`}
        >
          {value}
        </div>
        <div className={`text-sm sm:text-base md:text-lg ${suitColor}`}>
          {suitSymbol(suit)}
        </div>
      </div>
    </div>
  );
}
