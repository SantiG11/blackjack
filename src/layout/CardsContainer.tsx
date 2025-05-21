import { ReactNode } from "react";

type CardsContainerProps = {
  children: ReactNode;
};

export function CardsContainer({ children }: CardsContainerProps) {
  return (
    <div className=" flex gap-5 flex-wrap xl:w-[50vw] min-h-36 ">
      {children}
    </div>
  );
}
