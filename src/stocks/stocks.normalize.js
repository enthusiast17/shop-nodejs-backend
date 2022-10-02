export const normalizeStockForDatabase = (stock) => {
  const normalizedStock = {
    "product_id": {
      S: stock["product_id"],
    },
  };
  if (stock?.count) {
    normalizedStock.count = {
      N: `${stock.count}`
    };
  }
  return normalizedStock;
};

export const normalizeStockFromDatabase = (stock) => {
  if (!stock) {
    return null;
  }
  const normalizedStock = {
    "product_id": stock["product_id"]?.S,
  };
  if (stock?.count?.N) {
    normalizedStock.count = `${stock.count.N}`;
  }
  return normalizedStock;
};
