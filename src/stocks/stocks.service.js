import { GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { stocksTableParams } from "../constants/params.constants.js";
import { normalizeStockForDatabase, normalizeStockFromDatabase } from "./stocks.normalize.js";

export class StocksService {
  constructor(ddbClient) {
    this.ddbClient = ddbClient;
  }

  async getAll() {
    return (
      await this.ddbClient.send(
        new ScanCommand(stocksTableParams),
      )
    )?.Items?.map(
      normalizeStockFromDatabase,
    ) ?? [];
  }

  async getByProductId({ productId }) {
    const params = {
      ...stocksTableParams,
      Key: {
        "product_id": {
          S: productId,
        },
      },
    };
    const stock = await this.ddbClient.send(new GetItemCommand(params));
    return normalizeStockFromDatabase(
      stock?.Item ?? null,
    );
  }

  async create(stock, { onlyInput }) {
    const input = {
      ...stocksTableParams,
      Item: normalizeStockForDatabase(stock),
    };
    if (onlyInput) {
      return input;
    }
    return this.ddbClient.send(new PutItemCommand(input));
  }
}
