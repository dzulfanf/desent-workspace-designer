import type {
  ProductType,
  WorkspaceProductsResponse,
} from "@/types/workspace";

export async function getWorkspaceProducts(
  type: ProductType,
): Promise<WorkspaceProductsResponse> {
  const response = await fetch(
    `/api/workspace/products?type=${type}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workspace products");
  }

  return response.json();
}