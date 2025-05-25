import { useEffect, useState } from "react";

interface TextProps {
  text: string;
  value: string | number;
  action?: () => void;
  style?: string;
}

export default function ValueText({ text, value, action, style }: TextProps) {
  const [labelText, setLabelText] = useState("");
  const [labelValue, setLabelValue] = useState(value);

  useEffect(() => {
    setLabelText(text);
    setLabelValue(value);
  }, [text, value]);

  return (
    <div className="flex gap-2" onClick={action}>
      <div
        className={`flex gap-1 justify-center bg-[#1a1a1a]/60 backdrop-blur-sm min-w-[100px] px-2 py-2  rounded-lg border border-[#333333]/50 text-xs  ${
          style ? style : ""
        } `}
      >
        <span className="text-white font-medium text-l">{labelText} </span>
        <span className="text-[#d4af37] font-bold text-l">{labelValue}</span>
      </div>
    </div>
  );
}
