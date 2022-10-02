import { NotFoundHttpError } from "../common/httperror.js";

export class ProductsController {
  constructor(productsService, stocksService) {
    this.productsService = productsService;
    this.stocksService = stocksService;
  }

  async getAll() {
    const products = await this.productsService.getAll();
    return Promise.all(
      products.map(
        async (product) => {  
          const stock = await this.stocksService.getByProductId({
            productId: product.id,
          });
  
          if (stock) {
            return {
              ...product,
              count: stock.count,
            };
          }
  
          return product;
        },
      ),
    );
  }

  async getById({ id }) {
    const product = await this.productsService.getById({ id });
    if (!product) {
      throw new NotFoundHttpError({
        body: "The product not found",
      });
    }
    const stock = await this.stocksService.getByProductId({ productId: product.id });
    if (stock) {
      return {
        ...product,
        count: stock.count,
      };
    }
    return product;
  }
}
