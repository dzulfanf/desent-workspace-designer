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

  previewDesk: WorkspaceProduct | null;
  previewDeskVariant: ProductVariant | null;

  previewChair: WorkspaceProduct | null;
  previewChairVariant: ProductVariant | null;
};

export function WorkspacePreview({
  desk,
  deskVariant,
  chair,
  chairVariant,
  accessories,
  previewDesk,
  previewDeskVariant,
  previewChair,
  previewChairVariant,
}: WorkspacePreviewProps) {
  /*
   * Preview item takes priority over selected item.
   *
   * This means clicking a variant on any card can update
   * the workspace preview even before the product is selected.
   */
  const displayDesk = previewDesk ?? desk;
  const displayDeskVariant =
    previewDeskVariant ?? deskVariant;

  const displayChair = previewChair ?? chair;
  const displayChairVariant =
    previewChairVariant ?? chairVariant;

  if (!displayDesk) {
    return (
      <div className="mt-4 flex min-h-[560px] items-center justify-center bg-neutral-50 lg:ml-4 xl:mt-0">
        <p className="text-sm text-neutral-400">
          Select a desk to start designing
        </p>
      </div>
    );
  }

  const hasAccessory = (keyword: string) =>
    accessories.some((accessory) =>
      accessory.name.toLowerCase().includes(keyword),
    );

  const hasMonitor = hasAccessory("monitor");
  const hasMonitorArm = hasAccessory("monitor arm");
  const hasSpeaker = hasAccessory("speaker");

  const hasLamp =
    hasAccessory("lamp") ||
    hasAccessory("desk lamp");

  const hasPlant =
    hasAccessory("plant") ||
    hasAccessory("indoor plant");

  return (
    <div className="mt-4 flex min-h-[560px] w-full items-center justify-center bg-neutral-50/70 p-8 lg:ml-4 lg:mt-0">
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
            Workspace preview
          </p>

          <p className="mt-2 text-sm text-neutral-500">
            Your workspace is taking shape.
          </p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden border border-neutral-200 bg-white">
          {/* Floor */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-neutral-100" />

          {/* Indoor plant */}
          {hasPlant && (
            <div className="absolute bottom-[21%] left-[1%] md:left-[5%]">
              <div className="relative mx-auto h-14 w-14">
                <div className="absolute bottom-0 left-1/2 h-10 w-2 -translate-x-1/2 bg-neutral-500" />

                <div className="absolute left-1 top-1 h-5 w-8 -rotate-25 rounded-full bg-neutral-700" />

                <div className="absolute right-0 top-0 h-5 w-8 rotate-25 rounded-full bg-neutral-700" />

                <div className="absolute left-3 top-6 h-5 w-8 -rotate-45 rounded-full bg-neutral-600" />

                <div className="absolute right-1 top-5 h-5 w-8 rotate-45 rounded-full bg-neutral-600" />
              </div>

              <div className="mx-auto h-8 w-10 rounded-b-lg bg-neutral-400" />
            </div>
          )}

          {/* Desk */}
          <div className="absolute left-1/2 top-[42%] w-[68%] -translate-x-1/2">
            {/* Monitor arm */}
            {hasMonitorArm && (
              <div className="absolute -top-20 left-1/2 h-20 w-1 -translate-x-1/2 bg-neutral-500">
                <div className="absolute left-0 top-0 h-1 w-14 -translate-x-1/2 bg-neutral-500" />
              </div>
            )}

            {/* Monitor */}
            {hasMonitor && (
              <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                <div className="h-16 w-28 rounded-sm border-2 border-neutral-700 bg-neutral-200">
                  <div className="m-1 h-12 bg-neutral-100" />
                </div>

                <div className="mx-auto h-3 w-1 bg-neutral-700" />

                <div className="mx-auto h-1 w-8 bg-neutral-700" />
              </div>
            )}

            {/* Desk top */}
            <div className="h-5 bg-neutral-800" />

            {/* Desk legs */}
            <div className="mx-auto flex w-[92%] justify-between">
              <div className="h-28 w-3 bg-neutral-700" />
              <div className="h-28 w-3 bg-neutral-700" />
            </div>

            {/* Desk variant */}
            <div className="mt-[-110px] flex justify-center">
              <div className="border border-neutral-200 bg-white px-3 py-1.5 text-[10px] text-neutral-500">
                {displayDeskVariant?.value ??
                  displayDesk.name}
              </div>
            </div>

            {/* Desk lamp */}
            {hasLamp && (
              <div className="absolute right-[3%] -top-12">
                <div className="mx-auto h-4 w-9 rounded-t-full bg-neutral-600" />

                <div className="ml-4 h-7 w-1 bg-neutral-500" />

                <div className="h-1.5 w-9 rounded-full bg-neutral-600" />
              </div>
            )}

            {/* Speakers */}
            {hasSpeaker && (
              <>
                <div className="absolute left-[18%] -top-7 h-7 w-5 rounded-sm bg-neutral-600">
                  <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-neutral-300" />
                </div>

                <div className="absolute right-[18%] -top-7 h-7 w-5 rounded-sm bg-neutral-600">
                  <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-neutral-300" />
                </div>
              </>
            )}
          </div>

          {/* Chair */}
          {displayChair && (
            <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2">
              {/* Back */}
              <div className="mx-auto h-20 w-16 rounded-t-lg bg-neutral-700" />

              {/* Stem */}
              <div className="mx-auto h-16 w-2 bg-neutral-600" />

              {/* Base */}
              <div className="mx-auto h-2 w-20 rounded-full bg-neutral-600" />

              <div className="mt-2 text-center text-[10px] text-neutral-400">
                {displayChairVariant?.value ??
                  displayChair.name}
              </div>
            </div>
          )}

          {/* Generic accessories */}
          {accessories
            .filter(
              (accessory) =>
                ![
                  hasMonitor && "monitor",
                  hasMonitorArm && "monitor arm",
                  hasSpeaker && "speaker",
                  hasLamp && "lamp",
                  hasPlant && "plant",
                ].some(
                  (keyword) =>
                    keyword &&
                    accessory.name
                      .toLowerCase()
                      .includes(keyword),
                ),
            )
            .map((accessory, index) => (
              <div
                key={accessory.id}
                className="absolute bottom-[34%] left-1/2"
                style={{
                  transform: `translateX(${
                    (index - 0.5) * 40
                  }px)`,
                }}
              >
                <div className="h-6 w-6 rounded-sm bg-neutral-500" />
              </div>
            ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-neutral-500">
            {[
              displayDesk && "1 desk",
              displayChair && "1 chair",
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
        </div>
      </div>
    </div>
  );
}