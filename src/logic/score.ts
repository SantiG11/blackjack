import { CardType } from "../utils/GameTypes";

const calculateTotal = (hand: CardType[]) => {
  let totalScore = 0;
  let aceCount = 0;

  hand.forEach((card) => {
    switch (card.value) {
      case "J":
      case "Q":
      case "K":
        totalScore += 10;
        break;
      case "A":
        aceCount += 1;
        totalScore += 11;
        break;
      default:
        totalScore += parseInt(card.value, 10);
        break;
    }
  });

  while (totalScore > 21 && aceCount > 0) {
    totalScore -= 10;
    aceCount -= 1;
  }

  return totalScore;
};

export default calculateTotal;
