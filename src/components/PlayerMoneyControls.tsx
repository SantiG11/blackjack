import { useState } from "react";

import SecondaryButton from "../layout/SecondaryButton";
import ValueText from "../layout/ValueText";
import { Dropdown } from "../layout/Dropdown";

interface PlayerMoneyControlsProps {
  playerMoney: number;
  handleAddMoney: () => void;
  handleResetMoney: () => void;
}

export default function PlayerMoneyControls({
  playerMoney,
  handleAddMoney,
  handleResetMoney,
}: PlayerMoneyControlsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown((state) => !state);
  };

  return (
    <div className="flex flex-col items-center m-2 relative  group ">
      <ValueText
        text="Balance: "
        value={"$" + playerMoney}
        action={handleDropdown}
        style="hover:cursor-pointer"
      />

      <Dropdown show={showDropdown}>
        <SecondaryButton
          action={handleAddMoney}
          buttonText="Add money (+500)"
          disabled={!showDropdown}
        />
        <SecondaryButton action={handleResetMoney} buttonText="Reset money" />
      </Dropdown>
    </div>
  );
}
