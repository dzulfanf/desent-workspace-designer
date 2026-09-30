import type { WorkspaceCurrency } from "@/types/workspace";
import { workspaceCurrencyRates } from "./currency-rates";

export function convertWorkspacePrice(
  amountInUsd: number,
  currency: WorkspaceCurrency,
) {
  const rate = workspaceCurrencyRates[currency];

  return amountInUsd * rate;
}