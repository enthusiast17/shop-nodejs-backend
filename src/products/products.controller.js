import { NotFoundHttpError } from "../common/httperror.js";

export class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  async getAll() {
    return this.productsService.getAll();
  }

  async getById({ id }) {
    const product = await this.productsService.getById(id);

    if (!product) {
      throw new NotFoundHttpError({
        body: "The product doesn't exist. Please, use another id.",
      });
    }

    return product;
  }
}
