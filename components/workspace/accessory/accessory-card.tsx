import { formatWorkspacePrice } from "@/lib/workspace/format-price";
import type { WorkspaceCurrency, WorkspaceProduct } from "@/types/workspace";

type AccessoryCardProps = {
  product: WorkspaceProduct;
  isSelected: boolean;
  isAvailable: boolean;
  onToggle: () => void;
  currency: WorkspaceCurrency;
};

export function AccessoryCard({
  product,
  isSelected,
  isAvailable,
  onToggle,
  currency
}: AccessoryCardProps) {
  return (
    <article
      className={`border transition-colors ${
        !isAvailable
          ? "border-neutral-200 opacity-60"
          : isSelected
            ? "border-neutral-950"
            : "border-neutral-200 hover:border-neutral-400"
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-sm font-medium tracking-[-0.01em] text-neutral-950">
            {product.name}
          </h2>

          <span className="text-sm font-medium tabular-nums">
            {formatWorkspacePrice(product.pricePerWeek, currency)}
            <span className="ml-1 text-xs font-normal text-neutral-400">
              /wk
            </span>
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-6 text-neutral-500">
          {product.description}
        </p>

        {!isAvailable && (
          <p className="mt-3 text-xs text-neutral-400">
            Not available for the selected dates.
          </p>
        )}

        <button
          type="button"
          disabled={!isAvailable}
          onClick={onToggle}
          className={`mt-5 w-full border px-4 py-2.5 text-xs font-medium transition-colors ${
            !isAvailable
              ? "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400"
              : isSelected
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-neutral-300 hover:border-neutral-950"
          }`}
        >
          {!isAvailable
            ? "Unavailable"
            : isSelected
              ? "Added"
              : "Add accessory"}
        </button>
      </div>
    </article>
  );
}