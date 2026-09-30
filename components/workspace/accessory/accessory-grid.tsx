"use client";

import { AccessoryCard } from "./accessory-card";
import type {
  WorkspaceCurrency,
  WorkspaceProduct,
  WorkspaceProductWithAvailability,
} from "@/types/workspace";

type AccessoryGridProps = {
  products: WorkspaceProductWithAvailability[];
  selectedAccessories: WorkspaceProduct[];
  onToggleAccessory: (product: WorkspaceProduct) => void;
  currency: WorkspaceCurrency;
};

export function AccessoryGrid({
  products,
  selectedAccessories,
  onToggleAccessory,
  currency,
}: AccessoryGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[460px] items-center justify-center">
        <p className="text-sm text-neutral-500">
          No accessories are available for the selected dates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {products.map(({ product, isAvailable }) => (
        <AccessoryCard
          key={product.id}
          product={product}
          isSelected={selectedAccessories.some(
            (item) => item.id === product.id,
          )}
          isAvailable={isAvailable}
          onToggle={() => onToggleAccessory(product)}
          currency={currency}
        />
      ))}
    </div>
  );
}