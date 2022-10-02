export const normalizeStockForDatabase = (stock) => ({
  "product_id": { S: stock["product_id"] },
  count: { N: `${stock.count}` },
});

export const normalizeStockFromDatabase = (stock) => {
  if (!stock) {
    return null;
  }

  return {
    "product_id": stock["product_id"]?.S,
    count: stock?.count?.N,
  };
};
