import type { WorkspaceCurrency } from "@/types/workspace";
import { convertWorkspacePrice } from "./convert-price";

export function formatWorkspacePrice(
  amountInUsd: number,
  currency: WorkspaceCurrency,
) {
  const convertedAmount = convertWorkspacePrice(
    amountInUsd,
    currency,
  );

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "VND" ? 0 : 2,
  }).format(convertedAmount);
}