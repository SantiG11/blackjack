import { ReactNode } from "react";

type ButtonsContainerProps = {
  children: ReactNode;
  justify?: string;
};

export function ButtonsContainer({
  children,
  justify = "justify-start",
}: ButtonsContainerProps) {
  return (
    <div
      className={`relative flex  ${justify} items-center gap-1 p-2  flex-wrap`}
    >
      {children}
    </div>
  );
}
