import { NextRequest, NextResponse } from "next/server";

import { workspaceProducts } from "@/data/workspace";
import type { ProductType } from "@/types/workspace";

const productTypes: ProductType[] = [
  "desk",
  "chair",
  "accessory",
];

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");

  if (type && !productTypes.includes(type as ProductType)) {
    return NextResponse.json(
      {
        error: "Invalid product type",
      },
      { status: 400 },
    );
  }

  const products = type
    ? workspaceProducts.filter((product) => product.type === type)
    : workspaceProducts;

  return NextResponse.json({
    data: products,
    meta: {
      total: products.length,
    },
  });
}