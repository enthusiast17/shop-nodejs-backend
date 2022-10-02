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
