import assert from "assert";
import { SUCCESS_CODE } from "../constants/http.constants.js";
import { getProductsById, getProductsList } from "./products.lambda.js";
import { products } from "./products.mock.js";

export const productsTests = async () => {
  (async () => {
    process.stdin.write("getProductsList is on test\n");
    const result = await getProductsList();
    const expectedResult = {
      statusCode: SUCCESS_CODE,
      body: JSON.stringify(products),
    };
  
    assert.deepEqual(result, expectedResult);
    process.stdin.write("getProductsList is passed test\n");
  })();
  
  
  (async () => {
    process.stdin.write("getProductsById is on test\n");
    const id = "7567ec4b-b10c-48c5-9445-fc73c48a80a2";
    const result = await getProductsById({ pathParameters: { id } });
    const expectedResult = {
      statusCode: SUCCESS_CODE,
      body: JSON.stringify(products?.[4]),
    };
  
    assert.deepEqual(result, expectedResult);
    process.stdin.write("getProductsById is passed test\n");
  })();
};
