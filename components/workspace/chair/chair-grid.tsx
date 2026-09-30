"use client";

import { ChairCard } from "./chair-card";
import type {
  WorkspaceCurrency,
  WorkspaceProduct,
  WorkspaceProductWithAvailability,
} from "@/types/workspace";

type ChairGridProps = {
  products: WorkspaceProductWithAvailability[];
  selectedChairId: string | null;
  onSelectChair: (product: WorkspaceProduct) => void;
  currency: WorkspaceCurrency;
};

export function ChairGrid({
  products,
  selectedChairId,
  onSelectChair,
  currency
}: ChairGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {products.map(({ product, isAvailable }) => (
        <ChairCard
          key={product.id}
          product={product}
          isSelected={product.id === selectedChairId}
          isAvailable={isAvailable}
          onSelect={() => onSelectChair(product)}
          currency={currency}
        />
      ))}
    </div>
  );
}