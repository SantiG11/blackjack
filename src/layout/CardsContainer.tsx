import { ReactNode } from "react";

type CardsContainerProps = {
  children: ReactNode;
};

export function CardsContainer({ children }: CardsContainerProps) {
  return (
    <div className=" flex items-center p-2 gap-3 flex-wrap  min-h-[135px] md:min-h-[165px]  border-2 border-dashed rounded-md border-gray-950 ">
      {children}
    </div>
  );
}
