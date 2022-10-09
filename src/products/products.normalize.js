export const normalizeProductForDatabase = ({
  id,
  title,
  description,
  price,
}) => ({
  id: { S: id },
  title: { S: title },
  description: { S: description },
  price: { N: `${price}` },
});

export const normalizeProductFromDatabase = (product) => {
  if (!product) {
    return null;
  }
  const {
    id,
    title,
    description,
    price,
  } = product;
  return {
    id: id?.S,
    title: title?.S,
    description: description?.S,
    price: price?.N,
  };
};
