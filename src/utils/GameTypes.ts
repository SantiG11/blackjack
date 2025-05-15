export type GameTurn = "player" | "dealer";

export type BetCoin = 2.5 | 5 | 10 | 25 | 50 | 100;

export enum GameState {
  "playing",
  "betting",

  "player_busts",
  "dealer_busts",

  "tie_score",
  "tie_blackjack",

  "finished_game",

  "player_wins_score",
  "dealer_wins_score",

  "player_wins_blackjack",
  "dealer_wins_blackjack",
}

// ---Card types ---

export type Value =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type Suit = "Clubs" | "Diamonds" | "Hearts" | "Spades";

export type CardType = {
  suit: Suit;
  value: Value;
  hidden?: boolean;
};

// --- Outcome type ---

export type Outcome = "Tie" | "Player" | "Dealer" | "None";
