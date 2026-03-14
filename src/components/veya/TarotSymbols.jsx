import React from "react";

export default function TarotSymbols({ symbols }) {
  if (!symbols || symbols.length === 0) return null;

  return (
    <div className="border-t border-[#7c3aed]/10 pt-4">
      <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-3">✦ Key Symbols</p>
      <div className="space-y-2">
        {symbols.map((sym, idx) => (
          <div key={idx} className="text-sm">
            <p className="text-[#f5f0ff] font-medium">{sym.symbol}</p>
            <p className="text-xs text-[#c4b5fd]/60 italic">{sym.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}