import { ReactNode } from "react";

type DropdownProps = {
  children: ReactNode;
  show: boolean;
};

export function Dropdown({ children, show }: DropdownProps) {
  return (
    <div
      className={` flex flex-col b w-full mt-1 gap-0.5 absolute top-full opacity-0 -translate-y-2 transition-all duration-500 ${
        show
          ? " pointer-events-auto opacity-100 translate-y-0 "
          : "pointer-events-none"
      } `}
    >
      {children}
    </div>
  );
}
