import { useEffect, useState } from "react";
import { Suit, Value, CardType } from "./Card";

const suits: Suit[] = ["Clubs", "Diamonds", "Hearts", "Spades"];
const values: Value[] = ["A", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface CardDeckProps {
  shouldShuffle?: boolean; // The '?' makes it an optional prop
}

export default function CardDeck({ shouldShuffle = true }: CardDeckProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [givenCards, setGivenCards] = useState<CardType[]>([]);

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

    const dealCard = () => {
      if (cards.length > 0) {
        const lastCard = cards[cards.length - 1]; // Get the last card
        const remainingCards = cards.slice(0, -1); // Create a new array without the last card
        setCards(remainingCards);
        setGivenCards((prevGivenCards) => [...prevGivenCards, lastCard]); // Add to givenCards
        return lastCard;
      }
      return undefined;
    };
  }, [shouldShuffle]);
}
