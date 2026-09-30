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
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-6 py-3">
        {/* Brand + Rental Settings */}
        <div className="flex items-center gap-8">
          <div className="shrink-0">
            <p className="text-lg font-semibold tracking-tight">
              Desent
            </p>
          </div>

          <div className="flex items-center gap-3">
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
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm outline-none transition-colors hover:border-neutral-400"
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
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm outline-none transition-colors hover:border-neutral-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <CurrencySelector
            value={currency}
            onChange={onCurrencyChange}
          />

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("review-setup")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Review setup →
          </button>
        </div>
      </div>
    </header>
  );
}