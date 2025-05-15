import { BetCoin, Suit, Value } from "./GameTypes"; // Import necessary types if used in constant types

// --- Game Constants ---
export const DEALER_STAND_VALUE = 17; // Dealer must stand on this score or higher
export const BLACKJACK_SCORE = 21; // Target score for Blackjack
export const INITIAL_DEAL_COUNT = 2; // Number of cards dealt at the start
export const BLACKJACK_HAND_SIZE = 2; // Number of cards required for a natural Blackjack
export const BLACKJACK_PAYOUT_MULTIPLIER = 1.5; // Payout multiplier for Blackjack (3:2)
export const STANDARD_PAYOUT_MULTIPLIER = 1; // Payout multiplier for a standard win (1:1)
export const PUSH_PAYOUT_MULTIPLIER = 0; // Payout multiplier for a push (tie)
export const ADD_MONEY_AMOUNT = 500; // Amount added by the "Add Money" button
export const MINIMUM_BET_CHECK: BetCoin = 2.5; // Minimum amount for the low money check (already using Coins, but good to be explicit if needed)

export const Coins: BetCoin[] = [2.5, 5, 10, 25, 50, 100];

// --- Card Constants ---

export const suits: Suit[] = ["Clubs", "Diamonds", "Hearts", "Spades"];
export const values: Value[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
