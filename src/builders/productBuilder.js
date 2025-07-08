import { capitalize } from "@mui/material";

export function buildProduct(userId, data) {
  return {
    userId: userId,
    title: data.title,
    images: data.images,
    description: data.description,
    price: data.price,
    stock: data.stock,
    categoryId: data.categoryId,
    subcategoryIds: data.subcategoryIds,
    discountPercentage: data.discountPercentage,
  };
}
