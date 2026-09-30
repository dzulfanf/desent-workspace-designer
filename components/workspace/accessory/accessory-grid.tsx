"use client";

import type {
  WorkspaceCurrency,
  WorkspaceProduct,
  WorkspaceProductWithAvailability,
} from "@/types/workspace";

import { AccessoryCard } from "./accessory-card";

type AccessoryGridProps = {
  products: WorkspaceProductWithAvailability[];

  selectedAccessoryIds: string[];
  previewAccessoryVariants: Record<string, string>;

  onToggleAccessory: (product: WorkspaceProduct) => void;
  onPreviewAccessoryVariant: (
    product: WorkspaceProduct,
    variantId: string,
  ) => void;

  currency: WorkspaceCurrency;
};

export function AccessoryGrid({
  products,
  selectedAccessoryIds,
  previewAccessoryVariants,
  onToggleAccessory,
  onPreviewAccessoryVariant,
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
          isSelected={selectedAccessoryIds.includes(product.id)}
          isAvailable={isAvailable}
          onToggle={() => onToggleAccessory(product)}
          currency={currency}
          selectedVariantId={
            previewAccessoryVariants[product.id]
          }
          onVariantSelect={(variantId) =>
            onPreviewAccessoryVariant(
              product,
              variantId,
            )
          }
        />
      ))}
    </div>
  );
}