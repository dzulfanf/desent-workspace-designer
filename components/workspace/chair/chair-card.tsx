import { formatWorkspacePrice } from "@/lib/workspace/format-price";
import type {
  WorkspaceCurrency,
  WorkspaceProduct,
} from "@/types/workspace";

type ChairCardProps = {
  product: WorkspaceProduct;
  isSelected: boolean;
  isAvailable: boolean;
  onSelect: () => void;
  currency: WorkspaceCurrency;
};

export function ChairCard({
  product,
  isSelected,
  isAvailable,
  onSelect,
  currency,
}: ChairCardProps) {
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
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100 sm:aspect-[5/3]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-2.5 sm:p-3.5">
        <div className="flex items-start justify-between gap-2 sm:gap-3.5">
          <div className="min-w-0">
            <h2 className="text-xs font-medium tracking-[-0.01em] text-neutral-950 sm:text-sm">
              {product.name}
            </h2>

            {product.dimensions && (
              <p className="mt-0.5 text-[10px] text-neutral-400 sm:mt-1 sm:text-xs">
                {product.dimensions}
              </p>
            )}
          </div>

          <span className="shrink-0 text-xs font-medium tabular-nums sm:text-sm">
            {formatWorkspacePrice(product.pricePerWeek, currency)}
            <span className="ml-0.5 text-[10px] font-normal text-neutral-400 sm:ml-1 sm:text-xs">
              /wk
            </span>
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-neutral-500 sm:mt-2 sm:text-xs sm:leading-5">
          {product.description}
        </p>

        {product.variants?.length ? (
          <div className="mt-3 sm:mt-4">
            <p className="mb-1.5 text-[10px] text-neutral-400 sm:mb-2 sm:text-xs">
              {product.variants[0].name}
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!isAvailable}
                  className="border border-neutral-200 px-2 py-1 text-[10px] text-neutral-600 transition-colors hover:border-neutral-950 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 sm:px-2.5 sm:py-1.5 sm:text-xs"
                >
                  {variant.value}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {!isAvailable && (
          <p className="mt-2 text-[10px] leading-4 text-neutral-400 sm:mt-3 sm:text-xs">
            Not available for the selected dates.
          </p>
        )}

        <button
          type="button"
          disabled={!isAvailable}
          onClick={onSelect}
          className={`mt-3 w-full border px-3 py-2 text-[11px] font-medium transition-colors sm:mt-5 sm:px-4 sm:py-2.5 sm:text-xs ${
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
              : "Select chair"}
        </button>
      </div>
    </article>
  );
}