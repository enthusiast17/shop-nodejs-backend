import { TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb";
import Ajv from "ajv";
import { v4 as uuidv4 } from 'uuid';
import { BadRequestHttpError, NotFoundHttpError } from "../common/httperror.js";
import { productsSchema } from "./products.schema.js";

export class ProductsController {
  constructor(productsService, stocksService, ddbClient) {
    this.productsService = productsService;
    this.stocksService = stocksService;
    this.ddbClient = ddbClient;
    this.ajv = new Ajv();
    this.validate = this.ajv.compile(productsSchema);
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

  async create(product) {
    const isValid = this.validate(product);
    if (!isValid) {
      throw new BadRequestHttpError({
        body: this.validate.errors,
      });
    }
    const id = uuidv4();
    const services = [
      this.productsService.create({ ...product, id }, { onlyInput: true }),
    ];
    if (product?.count) {
      services.push(
        this.stocksService.create({ ...product, "product_id": id }, { onlyInput: true }),
      );
    }
    const transactItems = (await Promise.all(
      services,
    ))?.map((transactItem) => ({
      Put: transactItem,
    }));

    await this.ddbClient.send(
      new TransactWriteItemsCommand({
        TransactItems: transactItems,
      }),
    );
    return "The product created!";
  }
}
