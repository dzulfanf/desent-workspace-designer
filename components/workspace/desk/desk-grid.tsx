"use client";

import type {
  WorkspaceCurrency,
  WorkspaceProduct,
  WorkspaceProductWithAvailability,
} from "@/types/workspace";
import { DeskCard } from "./desk-card";

type DeskGridProps = {
  products: WorkspaceProductWithAvailability[];
  selectedDeskId: string | null;
  onSelectDesk: (product: WorkspaceProduct) => void;
  currency: WorkspaceCurrency;
};

export function DeskGrid({
  products,
  selectedDeskId,
  onSelectDesk,
  currency
}: DeskGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[460px] items-center justify-center">
        <p className="text-sm text-neutral-500">
          No desks are available for the selected dates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {products.map(({ product, isAvailable }) => (
        <DeskCard
          key={product.id}
          product={product}
          isSelected={product.id === selectedDeskId}
          isAvailable={isAvailable}
          onSelect={() => onSelectDesk(product)}
          currency={currency}
        />
      ))}
    </div>
  );
}