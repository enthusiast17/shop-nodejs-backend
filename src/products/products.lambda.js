import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ProductsController } from "./products.controller.js";
import { ProductsService } from "./products.service.js";
import { SUCCESS_CODE } from "../constants/http.constants.js";
import { normalizeError } from "../common/normalize-error.js";
import { StocksService } from "../stocks/stocks.service.js";

dotenv.config();

export const getProductsController = () => {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });

  return new ProductsController(
    new ProductsService(ddbClient),
    new StocksService(ddbClient),
    ddbClient,
  );
};

export const getProductsList = async (event) => {
  try {
    console.log(event);
    const productsController = getProductsController();
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
    const productsController = getProductsController();
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
    const productsController = getProductsController();
    const result = await productsController.create(product);

    return {
      statusCode: SUCCESS_CODE,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return normalizeError(error);
  }
};
