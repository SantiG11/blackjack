import { useEffect, useState } from "react";

import SecondaryButton from "../layout/SecondaryButton";
import ValueText from "../layout/ValueText";
import { Dropdown } from "../layout/Dropdown";

interface PlayerMoneyControlsProps {
  playerMoney: number;
  handleAddMoney: () => void;
  handleResetMoney: () => void;
  dropdown: boolean;
}

export default function PlayerMoneyControls({
  playerMoney,
  handleAddMoney,
  handleResetMoney,
  dropdown,
}: PlayerMoneyControlsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    if (dropdown) {
      setShowDropdown((state) => !state);
    }
  };

  useEffect(() => {
    if (!dropdown) {
      setShowDropdown(false);
    }
  }, [dropdown]);

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
          buttonText="Add $500"
          disabled={!showDropdown}
        />
        <SecondaryButton action={handleResetMoney} buttonText="Reset money" />
      </Dropdown>
    </div>
  );
}
