"use client";

import { workspaceExtensions } from "@/data/workspace";

import { ExtensionCard } from "./extension-card";

import type {
  WorkspaceCurrency,
  WorkspaceExtension,
  WorkspaceExtensionItem,
} from "@/types/workspace";

import { formatWorkspacePrice } from "@/lib/workspace/format-price";

type ExtensionGridProps = {
  selectedExtensions: WorkspaceExtension[];
  selectedExtensionItemIds: string[];
  onToggleExtension: (
    extension: WorkspaceExtension,
  ) => void;
  onToggleExtensionItem: (
    item: WorkspaceExtensionItem,
  ) => void;
  currency: WorkspaceCurrency;
};

export function ExtensionGrid({
  selectedExtensions,
  selectedExtensionItemIds,
  onToggleExtension,
  onToggleExtensionItem,
  currency,
}: ExtensionGridProps) {
  return (
    <>
      {/* Extensions */}
      <div className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 lg:grid-cols-4">
        {workspaceExtensions.map((extension) => {
          const isSelected = selectedExtensions.some(
            (selected) => selected.id === extension.id,
          );

          return (
            <ExtensionCard
              key={extension.id}
              extension={extension}
              isSelected={isSelected}
              onExplore={() =>
                onToggleExtension(extension)
              }
            />
          );
        })}
      </div>

      {/* Extension items */}
      {selectedExtensions.length > 0 && (
        <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
          {selectedExtensions.map((extension) => (
            <div
              key={extension.id}
              className="border-t border-neutral-200 pt-5 sm:pt-6"
            >
              <div className="mb-3 sm:mb-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 sm:text-xs">
                  {extension.name}
                </p>

                <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                  Select the items you want to add.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
                {extension.items.map((item) => {
                  const isSelected =
                    selectedExtensionItemIds.includes(
                      item.id,
                    );

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        onToggleExtensionItem(item)
                      }
                      className={`border p-2.5 text-left transition-colors sm:p-3.5 ${
                        isSelected
                          ? "border-neutral-950 bg-neutral-50"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-neutral-950 sm:text-sm">
                            {item.name}
                          </p>

                          {item.description && (
                            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-neutral-500 sm:text-xs sm:leading-5">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <span className="shrink-0 text-[10px] font-medium tabular-nums sm:text-xs">
                          {formatWorkspacePrice(
                            item.pricePerWeek,
                            currency,
                          )}
                          <span className="ml-0.5 font-normal text-neutral-400 sm:ml-1">
                            /wk
                          </span>
                        </span>
                      </div>

                      <div className="mt-3 text-[10px] font-medium sm:mt-4 sm:text-xs">
                        {isSelected
                          ? "Selected"
                          : "Add item"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}