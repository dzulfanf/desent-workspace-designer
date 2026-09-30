import { useQuery } from "@tanstack/react-query";

import { getWorkspaceProducts } from "@/lib/api/workspace";
import type { ProductType } from "@/types/workspace";

export function useWorkspaceProducts(type: ProductType) {
  return useQuery({
    queryKey: ["workspace-products", type],
    queryFn: () => getWorkspaceProducts(type),
  });
}