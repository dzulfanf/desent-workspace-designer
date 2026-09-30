export type ProductType = "desk" | "chair" | "accessory";

export type ProductVariant = {
  id: string;
  name: string;
  value: string;
};

export type WorkspaceCurrency = "USD" | "EUR" | "JPY" | "CNY" | "IDR" | "THB" | "VND";

export type WorkspaceAvailability = {
  locationId: string;
  bookedFrom: string;
  bookedUntil: string;
};

export type WorkspaceRental = {
  id: string;
  productId: string;
  locationId: string;
  rentedFrom: string;
  rentedUntil: string;
};

export type WorkspaceProduct = {
  id: string;
  type: ProductType;
  name: string;
  pricePerWeek: number;
  description: string;
  dimensions?: string;
  image: string;
  variants?: ProductVariant[];
  availability?: WorkspaceAvailability[];
};

export type WorkspaceProductWithAvailability = {
  product: WorkspaceProduct;
  isAvailable: boolean;
};

export type WorkspaceProductsResponse = {
  data: WorkspaceProduct[];
  meta: {
    total: number;
  };
};

export type WorkspaceExtensionItem = {
  id: string;
  name: string;
  description?: string;
  pricePerWeek: number;
};

export type WorkspaceExtension = {
  id: string;
  name: string;
  description: string;
  items: WorkspaceExtensionItem[];
};

export type WorkspaceLocation = {
  id: string;
  name: string;
  country: string;
  currency: string;
};