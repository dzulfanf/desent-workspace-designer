import type {
  ProductVariant,
  WorkspaceCurrency,
  WorkspaceExtension,
  WorkspaceExtensionItem,
  WorkspaceProduct,
} from "@/types/workspace";
import { formatWorkspacePrice } from "@/lib/workspace/format-price";

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

  return (
    <section className="pt-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            Review setup
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Your workspace
          </h2>
        </div>

        <div className="text-right">
          <p className="text-xs text-neutral-400">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>

          <p className="mt-1 text-sm font-medium">
            {formatWorkspacePrice(total, currency)}/wk
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {desk && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Desk
            </p>

            <div className="mt-2 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">
                  {desk.name}
                </p>

                {deskVariant && (
                  <p className="mt-1 text-sm text-neutral-500">
                    {deskVariant.name}: {deskVariant.value}
                  </p>
                )}
              </div>

              <p className="text-sm">
                {formatWorkspacePrice(
                  desk.pricePerWeek,
                  currency,
                )}
                /wk
              </p>
            </div>
          </div>
        )}

        {chair && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Chair
            </p>

            <div className="mt-2 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">
                  {chair.name}
                </p>

                {chairVariant && (
                  <p className="mt-1 text-sm text-neutral-500">
                    {chairVariant.name}: {chairVariant.value}
                  </p>
                )}
              </div>

              <p className="text-sm">
                {formatWorkspacePrice(
                  chair.pricePerWeek,
                  currency,
                )}
                /wk
              </p>
            </div>
          </div>
        )}

        {accessories.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Accessories
            </p>

            <div className="mt-2 space-y-2">
              {accessories.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span>{product.name}</span>

                  <span>
                    {formatWorkspacePrice(
                      product.pricePerWeek,
                      currency,
                    )}
                    /wk
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {extensions.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Extensions
            </p>

            <div className="mt-3 space-y-5">
              {extensions.map((extension) => {
                const selectedItems = extension.items.filter((item) =>
                  extensionItems.some(
                    (selectedItem) => selectedItem.id === item.id,
                  ),
                );

                return (
                  <div key={extension.id}>
                    <p className="text-sm font-medium text-neutral-950">
                      {extension.name}
                    </p>

                    {selectedItems.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {selectedItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between gap-4 text-sm"
                          >
                            <span className="text-neutral-600">
                              {item.name}
                            </span>

                            <span>
                              {formatWorkspacePrice(
                                item.pricePerWeek,
                                currency,
                              )}
                              /wk
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}