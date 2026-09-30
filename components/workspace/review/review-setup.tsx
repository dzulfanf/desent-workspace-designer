import type {
  ProductVariant,
  WorkspaceCurrency,
  WorkspaceExtension,
  WorkspaceExtensionItem,
  WorkspaceProduct,
} from "@/types/workspace";
import { formatWorkspacePrice } from "@/lib/workspace/format-price";

import {
  ReviewSummaryItem,
  ReviewExtensionItem,
} from "./review-summary-item";

type ReviewSetupProps = {
  currency: WorkspaceCurrency;

  desk: WorkspaceProduct | null;
  deskVariant: ProductVariant | null;

  chair: WorkspaceProduct | null;
  chairVariant: ProductVariant | null;

  accessories: WorkspaceProduct[];

  extensions: WorkspaceExtension[];
  extensionItems: WorkspaceExtensionItem[];

  itemCount: number;
};

export function ReviewSetup({
  currency,
  desk,
  deskVariant,
  chair,
  chairVariant,
  accessories,
  extensions,
  extensionItems,
  itemCount,
}: ReviewSetupProps) {
  const workspaceTotal =
    (desk?.pricePerWeek ?? 0) +
    (chair?.pricePerWeek ?? 0) +
    accessories.reduce(
      (sum, product) => sum + product.pricePerWeek,
      0,
    );

  const extensionTotal = extensionItems.reduce(
    (sum, item) => sum + item.pricePerWeek,
    0,
  );

  const total = workspaceTotal + extensionTotal;

  const hasWorkspaceItems =
    desk || chair || accessories.length > 0;

  return (
    <div>
      {/* Header */}
      <div className="border-b border-neutral-200 px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          Review setup
        </p>

        <div className="mt-2 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
              Your workspace
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {itemCount}{" "}
              {itemCount === 1 ? "item" : "items"} selected
            </p>
          </div>

          <p className="shrink-0 text-lg font-semibold tabular-nums text-neutral-950">
            {formatWorkspacePrice(total, currency)}
            <span className="ml-1 text-xs font-normal text-neutral-400">
              /wk
            </span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[60vh] overflow-y-auto px-6">
        {hasWorkspaceItems && (
          <section className="border-b border-neutral-200 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Workspace
            </p>

            <div className="mt-2 divide-y divide-neutral-100">
              {desk && (
                <ReviewSummaryItem
                  product={desk}
                  variant={deskVariant}
                  currency={currency}
                />
              )}

              {chair && (
                <ReviewSummaryItem
                  product={chair}
                  variant={chairVariant}
                  currency={currency}
                />
              )}

              {accessories.map((product) => (
                <ReviewSummaryItem
                  key={product.id}
                  product={product}
                  currency={currency}
                />
              ))}
            </div>
          </section>
        )}

        {extensions.length > 0 && (
          <section className="border-b border-neutral-200 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Extensions
            </p>

            <div className="mt-3">
              {extensions.map((extension) => {
                const items = extensionItems.filter((item) =>
                  extension.items.some(
                    (extensionItem) =>
                      extensionItem.id === item.id,
                  ),
                );

                return (
                  <div key={extension.id} className="mb-5 last:mb-0">
                    <p className="text-sm font-medium text-neutral-950">
                      {extension.name}
                    </p>

                    {items.length > 0 && (
                      <div className="mt-1 divide-y divide-neutral-100">
                        {items.map((item) => (
                          <ReviewExtensionItem
                            key={item.id}
                            item={item}
                            currency={currency}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Pricing */}
        <section className="py-5">
          <div className="space-y-3 text-sm">
            {workspaceTotal > 0 && (
              <div className="flex justify-between gap-6">
                <span className="text-neutral-500">
                  Workspace
                </span>

                <span className="tabular-nums text-neutral-700">
                  {formatWorkspacePrice(
                    workspaceTotal,
                    currency,
                  )}
                </span>
              </div>
            )}

            {extensionTotal > 0 && (
              <div className="flex justify-between gap-6">
                <span className="text-neutral-500">
                  Extensions
                </span>

                <span className="tabular-nums text-neutral-700">
                  {formatWorkspacePrice(
                    extensionTotal,
                    currency,
                  )}
                </span>
              </div>
            )}

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex justify-between gap-6">
                <span className="font-medium text-neutral-950">
                  Total
                </span>

                <span className="font-semibold tabular-nums text-neutral-950">
                  {formatWorkspacePrice(total, currency)}
                  <span className="ml-1 text-xs font-normal text-neutral-400">
                    /wk
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-4">
        <button
          type="button"
          className="w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}