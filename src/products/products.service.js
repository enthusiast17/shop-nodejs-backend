import { GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../dynamodb/client.js";
import { productsTableParams } from "../constants/params.constants.js";
import { normalizeProductForDatabase, normalizeProductFromDatabase } from "./products.normalize.js";

export class ProductsService {
  async getAll() {
    return (
      await ddbClient.send(
        new ScanCommand(productsTableParams)
      )
    )?.Items?.map(
      normalizeProductFromDatabase,
    ) ?? [];
  }

  async getById({ id }) {
    const params = {
      ...productsTableParams,
      Key: {
        id: {
          S: id,
        },
      },
    };
    return normalizeProductFromDatabase(
      (await ddbClient.send(new GetItemCommand(params)))?.Item ?? null
    );
  }

  async create(product, { onlyInput }) {
    const input = {
      ...productsTableParams,
      Item: normalizeProductForDatabase(product),
    };
    if (onlyInput) {
      return input;
    }
    return ddbClient.send(
      new PutItemCommand(input),
    );
  }
}
