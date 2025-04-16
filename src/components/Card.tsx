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
};

export default function Card({ suit, value }: CardType) {
  return (
    <div>
      <label>{suit}</label>
      <p>{value}</p>
    </div>
  );
}
