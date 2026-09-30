"use client";

import type {
  WorkspaceCurrency,
  WorkspaceProduct,
  WorkspaceProductWithAvailability,
} from "@/types/workspace";

import { DeskCard } from "./desk-card";

type DeskGridProps = {
  products: WorkspaceProductWithAvailability[];
  selectedDeskId: string | null | undefined;
  selectedDeskVariantId: string | null | undefined;

  previewDeskVariants: Record<string, string>;

  onSelectDesk: (product: WorkspaceProduct) => void;
  onPreviewDeskVariant: (
    product: WorkspaceProduct,
    variantId: string,
  ) => void;

  currency: WorkspaceCurrency;
};

export function DeskGrid({
  products,
  selectedDeskId,
  selectedDeskVariantId,
  previewDeskVariants,
  onSelectDesk,
  onPreviewDeskVariant,
  currency,
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
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {products.map(({ product, isAvailable }) => (
        <DeskCard
          key={product.id}
          product={product}
          isSelected={selectedDeskId === product.id}
          isAvailable={isAvailable}
          onSelect={() => onSelectDesk(product)}
          currency={currency}
          selectedVariantId={
            previewDeskVariants[product.id] ??
            (selectedDeskId === product.id
              ? selectedDeskVariantId ?? undefined
              : undefined)
          }
          onVariantSelect={(variantId) =>
            onPreviewDeskVariant(product, variantId)
          }
        />
      ))}
    </div>
  );
}