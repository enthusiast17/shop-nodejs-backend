import { ddbClient } from "../dynamodb/client.js";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { products } from "../src/products/products.mock.js";
import { stocks } from "../src/stocks/stocks.mock.js";
import { normalizeProductForDatabase } from "../src/products/products.normalize.js";
import { normalizeStockForDatabase } from "../src/stocks/stocks.normalize.js";
import { productsTableParams, stocksTableParams } from "../src/constants/params.constants.js";

(async () => {
  try {
    await Promise.all(
      products.map(
        async (product) => {
          await ddbClient.send(new PutItemCommand({
            ...productsTableParams,
            Item: normalizeProductForDatabase(product),
          }));
        }
      ),
    );
    process.stdout.write("Products fill successfully\n");
  } catch (error) {
    process.stdout.write(`Products fill error: ${error.message}\n`);
  }
})();

(async () => {
  try {
    await Promise.all(
      stocks.map(
        async (stock) => {
          return ddbClient?.send(new PutItemCommand({
            ...stocksTableParams,
            Item: normalizeStockForDatabase(stock),
          }));
        }
      ),
    );
    process.stdout.write("Stocks fill successfully\n");
  } catch (error) {
    process.stdout.write(`Stacks fill error: ${error.message}\n`);
  }
})();
