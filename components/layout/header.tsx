"use client";

import { CurrencySelector } from "../currency/currency-selector";
import { workspaceLocations } from "@/data/workspace";
import type {
  WorkspaceCurrency,
  WorkspaceLocation,
} from "@/types/workspace";

type HeaderProps = {
  currency: WorkspaceCurrency;
  location: WorkspaceLocation | null;
  rentalDate: string;

  onCurrencyChange: (currency: WorkspaceCurrency) => void;
  onLocationChange: (location: WorkspaceLocation) => void;
  onRentalDateChange: (date: string) => void;
};

export function Header({
  currency,
  location,
  rentalDate,
  onCurrencyChange,
  onLocationChange,
  onRentalDateChange,
}: HeaderProps) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        {/* Brand */}
        <div className="flex items-center justify-between gap-4 sm:shrink-0">
          <p className="text-lg font-semibold tracking-tight">
            Desent
          </p>

          {/* Currency on mobile */}
          <div className="sm:hidden">
            <CurrencySelector
              value={currency}
              onChange={onCurrencyChange}
            />
          </div>
        </div>

        {/* Right side: Location + Date + Currency */}
        <div className="hidden items-center justify-end gap-3 md:flex md:shrink-0">
          <select
            value={location?.id ?? ""}
            onChange={(event) => {
              const nextLocation = workspaceLocations.find(
                (item) => item.id === event.target.value,
              );

              if (nextLocation) {
                onLocationChange(nextLocation);
              }
            }}
            className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors hover:border-neutral-400 sm:w-auto sm:flex-none sm:px-4"
          >
            {workspaceLocations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={rentalDate}
            onChange={(event) =>
              onRentalDateChange(event.target.value)
            }
            className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors hover:border-neutral-400 sm:w-auto sm:flex-none sm:px-4"
          />

          {/* Currency on tablet / desktop */}
          <div className="hidden sm:block">
            <CurrencySelector
              value={currency}
              onChange={onCurrencyChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
}