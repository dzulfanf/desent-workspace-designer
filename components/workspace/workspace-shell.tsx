"use client";

import { useState } from "react";

import { DeskGrid } from "./desk/desk-grid";
import { ChairGrid } from "./chair/chair-grid";
import { AccessoryGrid } from "./accessory/accessory-grid";
import { WorkspacePreview } from "./workspace-preview";
import { ExtensionGrid } from "./extensions/extension-grid";
import { ReviewSetupBar } from "./review-bar/review-summary-bar";
import { ReviewSetupModal } from "./review/review-setup-modal";

import type {
  ProductVariant,
  WorkspaceCurrency,
  WorkspaceExtension,
  WorkspaceExtensionItem,
  WorkspaceLocation,
  WorkspaceProduct,
  WorkspaceProductWithAvailability,
} from "@/types/workspace";

import {
  workspaceLocations,
  workspaceProducts,
  workspaceRentals,
} from "@/data/workspace";

import { isProductAvailable } from "@/lib/workspace/is-product-available";

type WorkspaceTab =
  | "desks"
  | "chairs"
  | "accessories";

type WorkspaceShellProps = {
  currency: WorkspaceCurrency;
  location: WorkspaceLocation | null;
  rentalDate: string;

  onLocationChange: (location: WorkspaceLocation) => void;
  onRentalDateChange: (date: string) => void;
};

export function WorkspaceShell({
  currency,
  location,
  rentalDate,
  onLocationChange,
  onRentalDateChange,
}: WorkspaceShellProps) {
  /*
   * Selected workspace items
   */
  const [selectedDesk, setSelectedDesk] =
    useState<WorkspaceProduct | null>(null);

  const [selectedDeskVariant, setSelectedDeskVariant] =
    useState<ProductVariant | null>(null);

  const [selectedChair, setSelectedChair] =
    useState<WorkspaceProduct | null>(null);

  const [selectedChairVariant, setSelectedChairVariant] =
    useState<ProductVariant | null>(null);

  const [selectedAccessories, setSelectedAccessories] =
    useState<WorkspaceProduct[]>([]);

  /*
   * Variant previews
   *
   * These states are intentionally separate from the
   * selected workspace items.
   *
   * Clicking a variant changes the image shown in the
   * corresponding card without selecting the product.
   */
  const [previewDeskVariants, setPreviewDeskVariants] =
    useState<Record<string, string>>({});

  const [previewChairVariants, setPreviewChairVariants] =
    useState<Record<string, string>>({});

  const [previewAccessoryVariants, setPreviewAccessoryVariants] =
    useState<Record<string, string>>({});

  /*
   * Extensions
   */
  const [selectedExtensions, setSelectedExtensions] =
    useState<WorkspaceExtension[]>([]);

  const [selectedExtensionItems, setSelectedExtensionItems] =
    useState<WorkspaceExtensionItem[]>([]);

  /*
   * UI state
   */
  const [activeTab, setActiveTab] =
    useState<WorkspaceTab>("desks");

  const [isReviewOpen, setIsReviewOpen] =
    useState(false);

  /*
   * Desk
   */
  const handleSelectDesk = (
    product: WorkspaceProduct,
  ) => {
    setSelectedDesk(product);

    // Default selected variant for the actual workspace.
    setSelectedDeskVariant(
      product.variants?.[0] ?? null,
    );
  };

  const handlePreviewDeskVariant = (
    product: WorkspaceProduct,
    variantId: string,
  ) => {
    setPreviewDeskVariants((current) => ({
      ...current,
      [product.id]: variantId,
    }));
  };

  /*
   * Chair
   */
  const handleSelectChair = (
    product: WorkspaceProduct,
  ) => {
    setSelectedChair(product);

    // Default selected variant for the actual workspace.
    setSelectedChairVariant(
      product.variants?.[0] ?? null,
    );
  };

  const handlePreviewChairVariant = (
    product: WorkspaceProduct,
    variantId: string,
  ) => {
    setPreviewChairVariants((current) => ({
      ...current,
      [product.id]: variantId,
    }));
  };

  /*
   * Accessories
   */
  const handleToggleAccessory = (
    product: WorkspaceProduct,
  ) => {
    setSelectedAccessories((current) => {
      const exists = current.some(
        (item) => item.id === product.id,
      );

      if (exists) {
        return current.filter(
          (item) => item.id !== product.id,
        );
      }

      return [...current, product];
    });
  };

  const handlePreviewAccessoryVariant = (
    product: WorkspaceProduct,
    variantId: string,
  ) => {
    setPreviewAccessoryVariants((current) => ({
      ...current,
      [product.id]: variantId,
    }));
  };

  /*
   * Extensions
   */
  const handleToggleExtension = (
    extension: WorkspaceExtension,
  ) => {
    setSelectedExtensions((current) => {
      const exists = current.some(
        (item) => item.id === extension.id,
      );

      if (exists) {
        return current.filter(
          (item) => item.id !== extension.id,
        );
      }

      return [...current, extension];
    });
  };

  const handleToggleExtensionItem = (
    item: WorkspaceExtensionItem,
  ) => {
    setSelectedExtensionItems((current) => {
      const exists = current.some(
        (selected) => selected.id === item.id,
      );

      if (exists) {
        return current.filter(
          (selected) => selected.id !== item.id,
        );
      }

      return [...current, item];
    });
  };

  /*
   * Availability
   */
  const productsWithAvailability: WorkspaceProductWithAvailability[] =
    workspaceProducts.map((product) => ({
      product,
      isAvailable: isProductAvailable({
        product,
        locationId: location?.id ?? "",
        date: rentalDate,
        rentals: workspaceRentals,
      }),
    }));

  const desks =
    productsWithAvailability.filter(
      ({ product }) => product.type === "desk",
    );

  const chairs =
    productsWithAvailability.filter(
      ({ product }) => product.type === "chair",
    );

  const accessories =
    productsWithAvailability.filter(
      ({ product }) => product.type === "accessory",
    );
  
    /*
   * Workspace preview
   *
   * Preview state is independent from selected workspace state.
   * A variant can be previewed even when its product has not
   * been selected yet.
   */
  const previewDeskId = Object.keys(previewDeskVariants).find(
    (productId) => previewDeskVariants[productId],
  );

  const previewDesk = previewDeskId
    ? workspaceProducts.find(
        (product) => product.id === previewDeskId,
      ) ?? null
    : selectedDesk;

  const previewDeskVariant = previewDesk
    ? previewDesk.variants?.find(
        (variant) =>
          variant.id ===
          previewDeskVariants[previewDesk.id],
      ) ??
      (selectedDesk?.id === previewDesk.id
        ? selectedDeskVariant
        : null)
    : null;

  const previewChairId = Object.keys(
    previewChairVariants,
  ).find(
    (productId) => previewChairVariants[productId],
  );

  const previewChair = previewChairId
    ? workspaceProducts.find(
        (product) => product.id === previewChairId,
      ) ?? null
    : selectedChair;

  const previewChairVariant = previewChair
    ? previewChair.variants?.find(
        (variant) =>
          variant.id ===
          previewChairVariants[previewChair.id],
      ) ??
      (selectedChair?.id === previewChair.id
        ? selectedChairVariant
        : null)
    : null;

  /*
   * Review summary
   */
  const itemCount =
    (selectedDesk ? 1 : 0) +
    (selectedChair ? 1 : 0) +
    selectedAccessories.length +
    selectedExtensionItems.length;

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      {/* Page heading */}
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-medium text-neutral-500">
          Workspace designer
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950">
          Design your workspace
        </h1>

        <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-500">
          Build a workspace that fits the way you work.
        </p>
      </div>

      {/* Mobile rental settings */}
      <div className="mb-4 flex gap-2 md:hidden">
        <select
          value={location?.id ?? ""}
          onChange={(event) => {
            const nextLocation =
              workspaceLocations.find(
                (item) =>
                  item.id === event.target.value,
              );

            if (nextLocation) {
              onLocationChange(nextLocation);
            }
          }}
          className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors hover:border-neutral-400"
        >
          {workspaceLocations.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={rentalDate}
          onChange={(event) =>
            onRentalDateChange(event.target.value)
          }
          className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors hover:border-neutral-400"
        />
      </div>

      {/* Workspace designer */}
      <section className="grid overflow-hidden bg-white lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] xl:grid-cols-[minmax(0,1fr)_minmax(400px,0.8fr)]">
        {/* Catalog */}
        <div className="border-b border-neutral-200 pb-4 xl:pr-6">
          {/* Tabs */}
          <div className="flex rounded-xl border border-neutral-200 bg-neutral-50 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("desks")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                activeTab === "desks"
                  ? "bg-white font-medium text-neutral-950 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
            >
              Desks
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("chairs")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                activeTab === "chairs"
                  ? "bg-white font-medium text-neutral-950 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
            >
              Chairs
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("accessories")
              }
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                activeTab === "accessories"
                  ? "bg-white font-medium text-neutral-950 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
            >
              Accessories
            </button>
          </div>

          <div className="mt-6">
            {/* DESKS */}
            {activeTab === "desks" && (
              <>
                <div className="mb-4 mt-5 flex items-center justify-between">
                  <p className="text-sm text-neutral-500">
                    Showing desks
                  </p>

                  <button
                    type="button"
                    className="rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-950"
                  >
                    All types · Featured
                  </button>
                </div>

                <DeskGrid
                  products={desks}
                  selectedDeskId={selectedDesk?.id}
                  selectedDeskVariantId={
                    selectedDeskVariant?.id
                  }
                  previewDeskVariants={
                    previewDeskVariants
                  }
                  onSelectDesk={handleSelectDesk}
                  onPreviewDeskVariant={
                    handlePreviewDeskVariant
                  }
                  currency={currency}
                />
              </>
            )}

            {/* CHAIRS */}
            {activeTab === "chairs" && (
              <>
                <div className="mb-4 mt-5 flex items-center justify-between">
                  <p className="text-sm text-neutral-500">
                    Showing chairs
                  </p>

                  <button
                    type="button"
                    className="rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-950"
                  >
                    All types · Featured
                  </button>
                </div>

                <ChairGrid
                  products={chairs}
                  selectedChairId={selectedChair?.id}
                  selectedChairVariantId={
                    selectedChairVariant?.id
                  }
                  previewChairVariants={
                    previewChairVariants
                  }
                  onSelectChair={handleSelectChair}
                  onPreviewChairVariant={
                    handlePreviewChairVariant
                  }
                  currency={currency}
                />
              </>
            )}

            {/* ACCESSORIES */}
            {activeTab === "accessories" && (
              <>
                <div className="mb-4 mt-5 flex items-center justify-between">
                  <p className="text-sm text-neutral-500">
                    Showing accessories
                  </p>

                  <button
                    type="button"
                    className="rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-950"
                  >
                    All types · Featured
                  </button>
                </div>

                <AccessoryGrid
                  products={accessories}
                  selectedAccessoryIds={selectedAccessories.map(
                    (product) => product.id,
                  )}
                  previewAccessoryVariants={
                    previewAccessoryVariants
                  }
                  onToggleAccessory={
                    handleToggleAccessory
                  }
                  onPreviewAccessoryVariant={
                    handlePreviewAccessoryVariant
                  }
                  currency={currency}
                />
              </>
            )}
          </div>
        </div>

        {/* Workspace preview */}
        <WorkspacePreview
          desk={selectedDesk}
          deskVariant={selectedDeskVariant}
          chair={selectedChair}
          chairVariant={selectedChairVariant}
          accessories={selectedAccessories}
          previewDesk={previewDesk}
          previewDeskVariant={previewDeskVariant}
          previewChair={previewChair}
          previewChairVariant={previewChairVariant}
        />
      </section>

      {/* Floating review bar */}
      <ReviewSetupBar
        currency={currency}
        desk={selectedDesk}
        chair={selectedChair}
        accessories={selectedAccessories}
        extensionItems={selectedExtensionItems}
        itemCount={itemCount}
        onOpen={() => setIsReviewOpen(true)}
      />

      {/* Review modal */}
      <ReviewSetupModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        currency={currency}
        desk={selectedDesk}
        deskVariant={selectedDeskVariant}
        chair={selectedChair}
        chairVariant={selectedChairVariant}
        accessories={selectedAccessories}
        extensions={selectedExtensions}
        extensionItems={selectedExtensionItems}
        itemCount={itemCount}
      />

      {/* Extensions */}
      <section className="mt-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-neutral-500">
            Extend your workspace
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            More ways to use your space
          </h2>
        </div>

        <ExtensionGrid
          currency={currency}
          selectedExtensions={selectedExtensions}
          selectedExtensionItemIds={selectedExtensionItems.map(
            (item) => item.id,
          )}
          onToggleExtension={
            handleToggleExtension
          }
          onToggleExtensionItem={
            handleToggleExtensionItem
          }
        />
      </section>
    </main>
  );
}