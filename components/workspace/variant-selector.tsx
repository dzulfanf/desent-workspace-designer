import type { ProductVariant } from "@/types/workspace";

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variant: ProductVariant) => void;
};

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  const variantName = variants[0]?.name ?? "Option";

  return (
    <div className="mt-6">
      <p className="text-sm font-medium">
        {variantName}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected =
            variant.id === selectedVariantId;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelect(variant)}
              className={`border px-3 py-2 text-sm transition-colors ${
                isSelected
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 hover:border-neutral-950"
              }`}
            >
              {variant.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}