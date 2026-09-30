"use client";

import type {
  WorkspaceCurrency,
  WorkspaceProduct,
  WorkspaceProductWithAvailability,
} from "@/types/workspace";

import { ChairCard } from "./chair-card";

type ChairGridProps = {
  products: WorkspaceProductWithAvailability[];
  selectedChairId: string | null | undefined;
  selectedChairVariantId: string | null | undefined;

  previewChairVariants: Record<string, string>;

  onSelectChair: (product: WorkspaceProduct) => void;
  onPreviewChairVariant: (
    product: WorkspaceProduct,
    variantId: string,
  ) => void;

  currency: WorkspaceCurrency;
};

export function ChairGrid({
  products,
  selectedChairId,
  selectedChairVariantId,
  previewChairVariants,
  onSelectChair,
  onPreviewChairVariant,
  currency,
}: ChairGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[460px] items-center justify-center">
        <p className="text-sm text-neutral-500">
          No chairs are available for the selected dates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {products.map(({ product, isAvailable }) => (
        <ChairCard
          key={product.id}
          product={product}
          isSelected={selectedChairId === product.id}
          isAvailable={isAvailable}
          onSelect={() => onSelectChair(product)}
          currency={currency}
          selectedVariantId={previewChairVariants[product.id]}
          onVariantSelect={(variantId) =>
            onPreviewChairVariant(product, variantId)
          }
        />
      ))}
    </div>
  );
}