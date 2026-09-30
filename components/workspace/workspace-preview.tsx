import type {
  ProductVariant,
  WorkspaceProduct,
} from "@/types/workspace";

type WorkspacePreviewProps = {
  desk: WorkspaceProduct | null;
  deskVariant: ProductVariant | null;
  chair: WorkspaceProduct | null;
  chairVariant: ProductVariant | null;
  accessories: WorkspaceProduct[];
};

export function WorkspacePreview({
  desk,
  deskVariant,
  chair,
  chairVariant,
  accessories,
}: WorkspacePreviewProps) {

   if (!desk) {
    return (
      <div className="flex min-h-[560px] items-center justify-center bg-neutral-50">
        <p className="text-sm text-neutral-400">
          Select a desk to start designing
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-[560px] w-full items-center justify-center bg-neutral-50/70 p-8">
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
            Workspace preview
          </p>

          <p className="mt-2 text-sm text-neutral-500">
            {desk
              ? "Your workspace is taking shape."
              : "Select a desk to start designing."}
          </p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden border border-neutral-200 bg-white">
          {/* Floor */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-neutral-100" />

          {/* Desk */}
          {desk && (
            <div className="absolute left-1/2 top-[42%] w-[68%] -translate-x-1/2">
              <div className="h-5 bg-neutral-800" />

              <div className="mx-auto flex w-[92%] justify-between">
                <div className="h-28 w-3 bg-neutral-700" />
                <div className="h-28 w-3 bg-neutral-700" />
              </div>

              <div className="mt-[-110px] flex justify-center">
                <div className="border border-neutral-200 bg-white px-3 py-1.5 text-[10px] text-neutral-500">
                  {deskVariant?.value ?? desk.name}
                </div>
              </div>
            </div>
          )}

          {/* Chair */}
          {chair && (
            <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2">
              <div className="mx-auto h-20 w-16 rounded-t-lg bg-neutral-700" />
              <div className="mx-auto h-16 w-2 bg-neutral-600" />
              <div className="mx-auto h-2 w-20 rounded-full bg-neutral-600" />

              <div className="mt-2 text-center text-[10px] text-neutral-400">
                {chairVariant?.value ?? chair.name}
              </div>
            </div>
          )}

          {/* Accessories */}
          <div className="absolute right-6 top-6 flex flex-col items-end gap-2">
            {accessories.map((accessory) => (
              <div
                key={accessory.id}
                className="border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-600"
              >
                {accessory.name}
              </div>
            ))}
          </div>

          {!desk && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-500">
                  Start with a desk
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  Your selected items will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        {(desk || chair || accessories.length > 0) && (
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-neutral-500">
              {[
                desk && "1 desk",
                chair && "1 chair",
                accessories.length > 0 &&
                  `${accessories.length} ${
                    accessories.length === 1
                      ? "accessory"
                      : "accessories"
                  }`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>

            <span className="font-medium text-neutral-950">
              {[
                desk?.pricePerWeek ?? 0,
                chair?.pricePerWeek ?? 0,
                ...accessories.map(
                  (accessory) => accessory.pricePerWeek,
                ),
              ]
                .reduce((total, price) => total + price, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              <span className="ml-1 text-xs font-normal text-neutral-400">
                /wk
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

{/* <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
  <img
    src={desk.image}
    alt={desk.name}
    className="absolute left-1/2 top-[30%] w-[70%] -translate-x-1/2 object-contain"
  />

  {chair && (
    <img
      src={chair.image}
      alt={chair.name}
      className="absolute bottom-[5%] left-1/2 w-[28%] -translate-x-1/2 object-contain"
    />
  )}

  <div className="absolute left-1/2 top-[18%] flex -translate-x-1/2 gap-3">
    {accessories.map((accessory) => (
      <img
        key={accessory.id}
        src={accessory.image}
        alt={accessory.name}
        className="h-16 w-16 object-contain"
      />
    ))}
  </div>
</div> */}