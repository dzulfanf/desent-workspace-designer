"use client";

import type {
  ProductVariant,
  WorkspaceCurrency,
  WorkspaceExtension,
  WorkspaceExtensionItem,
  WorkspaceProduct,
} from "@/types/workspace";

import { ReviewSetup } from "./review-setup";

type ReviewSetupModalProps = {
  isOpen: boolean;
  onClose: () => void;

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

export function ReviewSetupModal({
  isOpen,
  onClose,
  currency,
  desk,
  deskVariant,
  chair,
  chairVariant,
  accessories,
  extensions,
  extensionItems,
  itemCount,
}: ReviewSetupModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Review workspace setup"
        className="relative w-full overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close review"
          className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-950"
        >
          <span aria-hidden="true">×</span>
        </button>

        <ReviewSetup
          currency={currency}
          desk={desk}
          deskVariant={deskVariant}
          chair={chair}
          chairVariant={chairVariant}
          accessories={accessories}
          extensions={extensions}
          extensionItems={extensionItems}
          itemCount={itemCount}
        />
      </div>
    </div>
  );
}