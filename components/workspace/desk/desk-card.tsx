import { formatWorkspacePrice } from "@/lib/workspace/format-price";
import type { WorkspaceCurrency, WorkspaceProduct } from "@/types/workspace";

type DeskCardProps = {
  product: WorkspaceProduct;
  isSelected: boolean;
  isAvailable: boolean;
  onSelect: () => void;
  currency: WorkspaceCurrency;
};

export function DeskCard({
  product,
  isSelected,
  isAvailable,
  onSelect,
  currency,
}: DeskCardProps) {
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
          <div>
            <h2 className="text-sm font-medium tracking-[-0.01em] text-neutral-950">
              {product.name}
            </h2>

            {product.dimensions && (
              <p className="mt-1 text-xs text-neutral-400">
                {product.dimensions}
              </p>
            )}
          </div>

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

        {product.variants?.length ? (
          <div className="mt-4">
            <p className="mb-2 text-xs text-neutral-400">
              {product.variants[0].name}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  className="border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-600 transition-colors hover:border-neutral-950 hover:text-neutral-950"
                >
                  {variant.value}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          disabled={!isAvailable}
          onClick={onSelect}
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
              ? "Selected"
              : "Select desk"}
        </button>
      </div>
    </article>
  );
}