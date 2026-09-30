import type { WorkspaceExtension } from "@/types/workspace";

type ExtensionCardProps = {
  extension: WorkspaceExtension;
  isSelected: boolean;
  onExplore: (extension: WorkspaceExtension) => void;
};

export function ExtensionCard({
  extension,
  isSelected,
  onExplore,
}: ExtensionCardProps) {
  return (
    <article
      className={`bg-white p-6 transition-colors ${
        isSelected
          ? "bg-neutral-50"
          : ""
      }`}
    >
      <div className="flex min-h-40 flex-col">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-medium text-neutral-950">
              {extension.name}
            </h3>

            {isSelected && (
              <span className="text-xs font-medium text-neutral-950">
                Selected
              </span>
            )}
          </div>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            {extension.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onExplore(extension)}
          className={`mt-auto pt-6 text-left text-sm font-medium underline underline-offset-4 transition-colors ${
            isSelected
              ? "text-neutral-950 hover:text-neutral-500"
              : "hover:text-neutral-500"
          }`}
        >
          {isSelected ? "Selected · Explore items" : "Explore"}
        </button>
      </div>
    </article>
  );
}