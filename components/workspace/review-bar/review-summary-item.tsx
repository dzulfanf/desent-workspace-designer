import type { WorkspaceCurrency } from "@/types/workspace";
import { formatWorkspacePrice } from "@/lib/workspace/format-price";

type ReviewSummaryItemProps = {
  category: string;
  name: string;
  price: number;
  currency: WorkspaceCurrency;
};

export function ReviewSummaryItem({
  category,
  name,
  price,
  currency,
}: ReviewSummaryItemProps) {
  return (
    <div className="flex items-center justify-between gap-3.5 py-2">
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          {category}
        </p>

        <p className="mt-0.5 truncate text-sm text-neutral-800">
          {name}
        </p>
      </div>

      <p className="shrink-0 text-sm tabular-nums text-neutral-600">
        {formatWorkspacePrice(price, currency)}
        <span className="ml-1 text-xs text-neutral-400">
          /wk
        </span>
      </p>
    </div>
  );
}