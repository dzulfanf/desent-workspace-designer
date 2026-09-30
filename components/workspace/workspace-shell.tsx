"use client";

import { useState } from "react";

import { DeskGrid } from "./desk/desk-grid";
import {
  ProductVariant,
  WorkspaceCurrency,
  WorkspaceExtension,
  WorkspaceExtensionItem,
  WorkspaceLocation,
  WorkspaceProduct,
  WorkspaceProductWithAvailability,
} from "@/types/workspace";

import { ChairGrid } from "./chair/chair-grid";
import { AccessoryGrid } from "./accessory/accessory-grid";
import { VariantSelector } from "./variant-selector";
import { WorkspacePreview } from "./workspace-preview";
import { ExtensionGrid } from "./extensions/extension-grid";

import {
  workspaceProducts,
  workspaceRentals,
} from "@/data/workspace";

import { isProductAvailable } from "@/lib/workspace/is-product-available";
import { ReviewSetupBar } from "./review-bar/review-summary-bar";
import { ReviewSetupModal } from "./review/review-setup-modal";

type WorkspaceTab =
  | "desks"
  | "chairs"
  | "accessories";

type WorkspaceShellProps = {
  currency: WorkspaceCurrency;
  location: WorkspaceLocation | null;
  rentalDate: string;
};

export function WorkspaceShell({
  currency,
  location,
  rentalDate,
}: WorkspaceShellProps) {
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

  const [selectedExtensions, setSelectedExtensions] =
    useState<WorkspaceExtension[]>([]);

  const [selectedExtensionItems, setSelectedExtensionItems] =
    useState<WorkspaceExtensionItem[]>([]);

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

  const [activeTab, setActiveTab] =
    useState<WorkspaceTab>("desks");

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleSelectDesk = (product: WorkspaceProduct) => {
    setSelectedDesk(product);
    setSelectedDeskVariant(null);
  };

  const handleSelectChair = (product: WorkspaceProduct) => {
    setSelectedChair(product);
    setSelectedChairVariant(null);
  };

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

  const itemCount =
    (selectedDesk ? 1 : 0) +
    (selectedChair ? 1 : 0) +
    selectedAccessories.length +
    selectedExtensionItems.length;
  
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
  
  const desks = productsWithAvailability.filter(
    ({ product }) => product.type === "desk",
  );

  const chairs = productsWithAvailability.filter(
    ({ product }) => product.type === "chair",
  );

  const accessories = productsWithAvailability.filter(
    ({ product }) => product.type === "accessory",
  );

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-12">
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

      <section className="grid overflow-hidden bg-white lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr) xl:grid-cols-[minmax(0,1fr)_minmax(400px,0.8fr)]">
        <div className="border-b border-neutral-200 xl:pr-6 pb-4">
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
              onClick={() => setActiveTab("accessories")}
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
                  selectedDeskId={selectedDesk?.id ?? null}
                  onSelectDesk={handleSelectDesk}
                  currency={currency}
                />

                {selectedDesk?.variants?.length ? (
                  <VariantSelector
                    variants={selectedDesk.variants}
                    selectedVariantId={selectedDeskVariant?.id ?? null}
                    onSelect={setSelectedDeskVariant}
                  />
                ) : null}
              </>
            )}

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
                  selectedChairId={selectedChair?.id ?? null}
                  onSelectChair={handleSelectChair}
                  currency={currency}
                />

                {selectedChair?.variants?.length ? (
                  <VariantSelector
                    variants={selectedChair.variants}
                    selectedVariantId={selectedChairVariant?.id ?? null}
                    onSelect={setSelectedChairVariant}
                  />
                ) : null}
              </>
            )}

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
                  selectedAccessories={selectedAccessories}
                  onToggleAccessory={handleToggleAccessory}
                  currency={currency}
                />
              </>
            )}
          </div>
        </div>

        <WorkspacePreview
          desk={selectedDesk}
          deskVariant={selectedDeskVariant}
          chair={selectedChair}
          chairVariant={selectedChairVariant}
          accessories={selectedAccessories}
        />
      </section>

      <ReviewSetupBar
        currency={currency}
        desk={selectedDesk}
        chair={selectedChair}
        accessories={selectedAccessories}
        extensionItems={selectedExtensionItems}
        itemCount={itemCount}
        onOpen={() =>  setIsReviewOpen(true)}
      />

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
          onToggleExtension={handleToggleExtension}
          onToggleExtensionItem={handleToggleExtensionItem}
        />
      </section>
    </main>
  );
}