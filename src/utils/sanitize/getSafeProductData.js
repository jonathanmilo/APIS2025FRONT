export const getSafeProductData = (item) => {
  return {
    title: item.productData?.title || "Producto no disponible",
    price: item.productData?.price || 0,
    discountPercentage: item.productData?.discountPercentage || 0,
    images: item.productData?.images || [{ url: "/placeholder.jpg" }],
  };
};
