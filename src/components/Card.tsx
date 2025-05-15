import { CardType } from "../utils/GameTypes";

export default function Card({ suit, value, hidden = false }: CardType) {
  return hidden ? (
    <div className="flex flex-wrap flex-col place-content-center border-2 border-black w-24 h-36 font-bold text-center p-2 rounded-xl">
      Back of the card
    </div>
  ) : (
    <div className="flex flex-wrap flex-col place-content-center border-2 border-black w-24 h-36 font-bold rounded-xl ">
      <label className="text-center">{suit}</label>
      <p className="text-center">{value}</p>
    </div>
  );
}
