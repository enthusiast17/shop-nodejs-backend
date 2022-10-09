import { GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { productsTableParams } from "../constants/params.constants.js";
import { normalizeProductForDatabase, normalizeProductFromDatabase } from "./products.normalize.js";

export class ProductsService {
  constructor(ddbClient) {
    this.ddbClient = ddbClient;
  }

  async getAll() {
    return (
      await this.ddbClient.send(
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
      (await this.ddbClient.send(new GetItemCommand(params)))?.Item ?? null
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
    return this.ddbClient.send(
      new PutItemCommand(input),
    );
  }
}
