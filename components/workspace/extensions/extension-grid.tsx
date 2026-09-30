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
      <div className="grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
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

      {selectedExtensions.length > 0 && (
        <div className="mt-6 space-y-6">
          {selectedExtensions.map((extension) => (
            <div
              key={extension.id}
              className="border-t border-neutral-200 pt-6"
            >
              <div className="mb-4">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  {extension.name}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Select the items you want to add.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                      className={`border p-4 text-left transition-colors ${
                        isSelected
                          ? "border-neutral-950 bg-neutral-50"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-neutral-950">
                            {item.name}
                          </p>

                          {item.description && (
                            <p className="mt-1 text-xs leading-5 text-neutral-500">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <span className="shrink-0 text-xs font-medium">
                          {formatWorkspacePrice(
                            item.pricePerWeek,
                            currency,
                          )}
                          /wk
                        </span>
                      </div>

                      <div className="mt-4 text-xs font-medium">
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