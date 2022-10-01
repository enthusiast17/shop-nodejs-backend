import { products } from "./products.mock.js";

export class ProductsService {
  async getAll() {
    return products;
  }

  async getById(id) {
    return products.find((product) => product?.id === id);
  }
}
