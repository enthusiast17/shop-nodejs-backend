export const productsSchema = {
  type: "object",
  properties: {
    title: { type: "string", nullable: false },
    description: { type: "string", nullable: false },
    price: { type: "integer", nullable: false },
    count: { type: "integer", nullable: false },
  },
  required: ["title", "description", "price"],
  additionalProperties: false,
};
