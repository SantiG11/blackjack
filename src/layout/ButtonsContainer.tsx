import { ReactNode } from "react";

type ButtonsContainerProps = {
  children: ReactNode;
};

export function ButtonsContainer({ children }: ButtonsContainerProps) {
  return (
    <div className="flex  justify-center items-center gap-1 m-2 p-2  flex-wrap">
      {children}
    </div>
  );
}
