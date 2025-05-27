import { ReactNode } from "react";

type ButtonsContainerProps = {
  children: ReactNode;
};

export function ButtonsContainer({ children }: ButtonsContainerProps) {
  return (
    <div
      className={`relative flex justify-center   items-center gap-1  md:py-1 `}
    >
      {children}
    </div>
  );
}
