import type {
  WorkspaceProduct,
  WorkspaceRental,
} from "@/types/workspace";

type IsProductAvailableParams = {
  product: WorkspaceProduct;
  locationId: string;
  date: string;
  rentals: WorkspaceRental[];
};

export function isProductAvailable({
  product,
  locationId,
  date,
  rentals,
}: IsProductAvailableParams) {
  const today = new Date().toISOString().slice(0, 10);

  // Past dates and today are not available
  if (date <= today) {
    return false;
  }

  return !rentals.some(
    (rental) =>
      rental.productId === product.id &&
      rental.locationId === locationId &&
      rental.rentedFrom <= date &&
      date <= rental.rentedUntil,
  );
}