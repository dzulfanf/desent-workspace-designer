"use client";

import { useState } from "react";

import { currencies } from "./currency-data";

import type { WorkspaceCurrency } from "@/types/workspace";

type CurrencySelectorProps = {
  value: WorkspaceCurrency;
  onChange: (currency: WorkspaceCurrency) => void;
};

export function CurrencySelector({
  value,
  onChange,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === value,
  );

  const handleSelect = (
    currency: (typeof currencies)[number],
  ) => {
    onChange(currency.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm transition-colors hover:border-neutral-400"
      >
        <span className="text-xs font-medium">
          {selectedCurrency?.code ?? value}
        </span>

        <span
          className="text-neutral-400"
          aria-hidden="true"
        >
          ↓
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              type="button"
              onClick={() => handleSelect(currency)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 ${
                currency.code === value
                  ? "bg-neutral-50 font-medium"
                  : ""
              }`}
            >
              <span>{currency.name}</span>

              <span className="text-xs text-neutral-500">
                {currency.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}