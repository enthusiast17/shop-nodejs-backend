import { ProductsController } from "./products.controller.js";
import { ProductsService } from "./products.service.js";
import { SUCCESS_CODE } from "../constants/http.constants.js";
import { normalizeError } from "../common/normalize-error.js";
import { StocksService } from "../stocks/stocks.service.js";

const productsController = new ProductsController(
  new ProductsService(),
  new StocksService(),
);

export const getProductsList = async (event) => {
  try {
    console.log(event);
    const result = await productsController.getAll();

    return {
      statusCode: SUCCESS_CODE,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return normalizeError(error);
  }
};

export const getProductsById = async (event) => {
  try {
    console.log(event);
    const { id } = event?.pathParameters;
    const result = await productsController.getById({ id });

    return {
      statusCode: SUCCESS_CODE,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return normalizeError(error);
  }
};

export const createProduct = async (event) => {
  try {
    console.log(event);
    const product = JSON.parse(event?.body);
    const result = await productsController.create(product);

    return {
      statusCode: SUCCESS_CODE,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return normalizeError(error);
  }
};
