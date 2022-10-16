import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ProductsController } from "./products.controller.js";
import { ProductsService } from "./products.service.js";
import { SUCCESS_CODE } from "../constants/http.constants.js";
import { normalizeError } from "../common/normalize-error.js";
import { StocksService } from "../stocks/stocks.service.js";

dotenv.config();

export const getControllers = () => {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  const productsController = new ProductsController(
    new ProductsService(ddbClient),
    new StocksService(ddbClient),
    ddbClient,
  );

  return { productsController };
};

export const getProductsList = async (event) => {
  try {
    console.log(event);
    const { productsController } = getControllers();
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
    const { productsController } = getControllers();
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
    const { productsController } = getControllers();
    const result = await productsController.create(product);

    return {
      statusCode: SUCCESS_CODE,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return normalizeError(error);
  }
};

export const catalogBatchProcess = async (event) => {
  try {
    console.log(event);
    const { productsController } = getControllers();
    const result = await Promise.allSettled(
      event?.Records?.map(
        async (record) => {
          const product = JSON.parse(
            record?.body?.replace(/[\u200B-\u200D\uFEFF]/g, ""),
          );
          await productsController.create({
            ...product,
            price: +product?.price,
            count: +product?.count,
          });
        }  
      ),
    );
    console.log(result);
  } catch (error) {
    return normalizeError(error);
  }
}
