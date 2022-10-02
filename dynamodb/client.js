import dotenv from "dotenv";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

dotenv.config();

const ddbClient = new DynamoDBClient({ region: process.env.REGION });

export { ddbClient };
