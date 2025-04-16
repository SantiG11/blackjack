import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Suit, Value, CardType } from "./Card";

//All the values and suits of of the cards
const suits: Suit[] = ["Clubs", "Diamonds", "Hearts", "Spades"];
const values: Value[] = [
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

//A funcition to shuffle the array of cards
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export interface CardDeckProps {
  shouldShuffle?: boolean;
}

// An interface for the methods we want to expose from the CardDeck component.
export interface CardDeckHandle {
  dealCard: (arg?: number) => CardType[] | undefined;
}

const CardDeck = forwardRef<CardDeckHandle, CardDeckProps>(
  ({ shouldShuffle = true }, ref) => {
    const [cards, setCards] = useState<CardType[]>([]);

    useEffect(() => {
      const initialCards: CardType[] = [];
      suits.forEach((cardSuit) => {
        values.forEach((cardValue) => {
          initialCards.push({ suit: cardSuit, value: cardValue });
        });
      });

      if (shouldShuffle) {
        const shuffledCards = shuffleArray(initialCards);
        setCards(shuffledCards);
      } else {
        setCards(initialCards);
      }
    }, [shouldShuffle]);

    const dealCard = (count: number = 1): CardType[] | undefined => {
      if (cards.length < count) {
        console.log("Not enough cards in the deck to deal" + count + "cards.");
        return undefined;
      }

      const dealtCards = cards.slice(0, count); // Take the first 'count' cards
      setCards((prevCards) => prevCards.slice(count)); // Remove the dealt cards from the deck
      setTimeout(() => {
        console.log(cards.length - count);
      }, 99);
      return dealtCards;
    };

    useImperativeHandle(ref, () => ({
      dealCard, // Expose the dealCard function directly
    }));

    return <div style={{ display: "none" }}></div>;
  }
);

CardDeck.displayName = "CardDeck";

export default CardDeck;
