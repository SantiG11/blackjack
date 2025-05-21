import { ReactNode } from "react";

type GameSectionProps = {
  children: ReactNode;
};

export function GameSection({ children }: GameSectionProps) {
  return <div className=" flex flex-col gap-4 p-3 ">{children}</div>;
}
