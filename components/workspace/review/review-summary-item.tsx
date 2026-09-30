import type {
  ProductVariant,
  WorkspaceCurrency,
  WorkspaceProduct,
  WorkspaceExtensionItem,
} from "@/types/workspace";
import { formatWorkspacePrice } from "@/lib/workspace/format-price";

type ReviewSummaryItemProps = {
  product: WorkspaceProduct;
  variant?: ProductVariant | null;
  currency: WorkspaceCurrency;
};

export function ReviewSummaryItem({
  product,
  variant,
  currency,
}: ReviewSummaryItemProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-neutral-950">
          {product.name}
        </p>

        {variant && (
          <p className="mt-1 text-xs text-neutral-500">
            {variant.name}: {variant.value}
          </p>
        )}
      </div>

      <p className="shrink-0 text-sm tabular-nums text-neutral-600">
        {formatWorkspacePrice(product.pricePerWeek, currency)}
        <span className="text-neutral-400">/wk</span>
      </p>
    </div>
  );
}

type ReviewExtensionItemProps = {
  item: WorkspaceExtensionItem;
  currency: WorkspaceCurrency;
};

export function ReviewExtensionItem({
  item,
  currency,
}: ReviewExtensionItemProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm text-neutral-700">
          {item.name}
        </p>

        {item.description && (
          <p className="mt-1 text-xs leading-5 text-neutral-400">
            {item.description}
          </p>
        )}
      </div>

      <p className="shrink-0 text-sm tabular-nums text-neutral-600">
        {formatWorkspacePrice(item.pricePerWeek, currency)}
        <span className="text-neutral-400">/wk</span>
      </p>
    </div>
  );
}