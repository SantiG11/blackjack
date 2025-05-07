interface PlayerMoneyProps {
  money: number;
}

export default function PlayerMoney({ money }: PlayerMoneyProps) {
  return (
    <div>
      <h2>Player money: </h2>
      <p>{money}</p>
    </div>
  );
}
