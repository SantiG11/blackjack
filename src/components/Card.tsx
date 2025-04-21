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

export default function Card({ suit, value, hidden = false }: CardType) {
  return (
    <div style={{ backgroundColor: hidden ? "black" : "" }}>
      <label>{suit}</label>
      <p>{value}</p>
    </div>
  );
}
