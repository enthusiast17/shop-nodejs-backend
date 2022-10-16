import dotenv from "dotenv";

dotenv.config();

const productsTableParams = {
  TableName: process.env.PRODUCTS_TABLE_NAME,
};

const stocksTableParams = {
  TableName: process.env.STOCKS_TABLE_NAME,
};

const snsParams = {
  TopicArn: process.env.SNS_ARN,
};

export {
  productsTableParams,
  stocksTableParams,
  snsParams,
};
