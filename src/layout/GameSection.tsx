import { ReactNode } from "react";

type GameSectionProps = {
  children: ReactNode;
};

export function GameSection({ children }: GameSectionProps) {
  return (
    <div className=" flex flex-col gap-4 px-3 md:px-2 py-1 md:max-w-[50vw]">
      {children}
    </div>
  );
}
