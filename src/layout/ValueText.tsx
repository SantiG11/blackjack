interface TextProps {
  text: string;
  value: string | number;
  action?: () => void;
  style?: string;
}

export default function ValueText({ text, value, action, style }: TextProps) {
  return (
    <div className="flex gap-2" onClick={action}>
      <div
        className={`flex gap-1 justify-center bg-[#1a1a1a]/60 backdrop-blur-sm min-w-[100px] px-2 py-2 md:py-1.5 rounded-lg border border-[#333333]/50 text-xs sm:text-sm ${style} `}
      >
        <span className="text-white font-medium text-l">{text} </span>
        <span className="text-[#d4af37] font-bold text-l">{value}</span>
      </div>
    </div>
  );
}
