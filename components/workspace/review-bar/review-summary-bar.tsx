"use client";

import { useState } from "react";

import type {
  WorkspaceCurrency,
  WorkspaceExtensionItem,
  WorkspaceProduct,
} from "@/types/workspace";

import { formatWorkspacePrice } from "@/lib/workspace/format-price";
import { ReviewSummaryItem } from "./review-summary-item";

type ReviewSetupBarProps = {
  currency: WorkspaceCurrency;
  desk: WorkspaceProduct | null;
  chair: WorkspaceProduct | null;
  accessories: WorkspaceProduct[];
  extensionItems: WorkspaceExtensionItem[];
  itemCount: number;
  onOpen: () => void;
};

export function ReviewSetupBar({
  currency,
  desk,
  chair,
  accessories,
  extensionItems,
  itemCount,
  onOpen,
}: ReviewSetupBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const extensionTotal = extensionItems.reduce(
    (sum, item) => sum + item.pricePerWeek,
    0,
  );

  const total =
    (desk?.pricePerWeek ?? 0) +
    (chair?.pricePerWeek ?? 0) +
    accessories.reduce(
      (sum, product) => sum + product.pricePerWeek,
      0,
    ) +
    extensionTotal;

  const selectedItemNames = [
    desk?.name,
    chair?.name,
    ...accessories.map((product) => product.name),
    ...extensionItems.map((item) => item.name),
  ].filter(Boolean);

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-neutral-200 bg-white/95 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur">
        {/* Summary */}
        <div className="px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-3">
            {/* Toggle */}
            <button
              type="button"
              onClick={() =>
                setIsExpanded((current) => !current)
              }
              aria-label={
                isExpanded
                  ? "Collapse selected items"
                  : "Expand selected items"
              }
              aria-expanded={isExpanded}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-950"
            >
              <span
                className={`text-xs transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                ↓
              </span>
            </button>

            {/* Workspace info */}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                Your workspace
              </p>

              <div className="mt-0.5 flex min-w-0 items-center gap-2">
                <p className="min-w-0 truncate text-xs font-medium text-neutral-950 sm:text-sm">
                  {selectedItemNames.join(" · ")}
                </p>

                <span className="shrink-0 text-[10px] text-neutral-400 sm:text-xs">
                  {itemCount}{" "}
                  {itemCount === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="shrink-0 text-right">
              <p className="hidden text-[10px] text-neutral-400 sm:block">
                Total
              </p>

              <p className="text-sm font-semibold tracking-tight text-neutral-950 sm:text-lg">
                {formatWorkspacePrice(total, currency)}
                <span className="ml-1 text-[10px] font-normal text-neutral-400 sm:text-xs">
                  /wk
                </span>
              </p>
            </div>

            {/* Desktop review */}
            <button
              type="button"
              onClick={onOpen}
              disabled={!desk}
              className={`hidden shrink-0 rounded-full ${!desk ? 'bg-neutral-400' : 'bg-neutral-950'} px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:block`}
            >
              Review setup →
            </button>
          </div>
        </div>

        {/* Selected items */}
        {isExpanded && (
          <div className="border-t border-neutral-100 px-4 py-3 sm:px-5 sm:py-4">
            <div className="space-y-1">
              {desk && (
                <ReviewSummaryItem
                  category="Desk"
                  name={desk.name}
                  price={desk.pricePerWeek}
                  currency={currency}
                />
              )}

              {chair && (
                <ReviewSummaryItem
                  category="Chair"
                  name={chair.name}
                  price={chair.pricePerWeek}
                  currency={currency}
                />
              )}

              {accessories.map((product) => (
                <ReviewSummaryItem
                  key={product.id}
                  category="Accessory"
                  name={product.name}
                  price={product.pricePerWeek}
                  currency={currency}
                />
              ))}

              {extensionItems.map((item) => (
                <ReviewSummaryItem
                  key={item.id}
                  category="Extension"
                  name={item.name}
                  price={item.pricePerWeek}
                  currency={currency}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile review action */}
        <div className="border-t border-neutral-100 px-4 py-3 sm:hidden">
          <button
            type="button"
            onClick={onOpen}
            className={`w-full rounded-full  ${!desk ? 'bg-neutral-400' : 'bg-neutral-950'} px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800`}
            disabled={!desk}
          >
            Review setup →
          </button>
        </div>
      </div>
    </div>
  );
}