import { ReactNode } from "react";

type CardsContainerProps = {
  children: ReactNode;
};

export function CardsContainer({ children }: CardsContainerProps) {
  return (
    <div className=" flex items-center p-2 gap-3 flex-wrap xl:w-[50vw] min-h-[120px] border-2 border-dashed rounded-md border-gray-950 ">
      {children}
    </div>
  );
}
