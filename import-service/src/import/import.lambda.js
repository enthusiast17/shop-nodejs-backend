import dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
import { SQSClient } from "@aws-sdk/client-sqs";
import { ImportController } from "./import.controller.js";
import { ImportService } from "./import.service.js";
import { normalizeError } from "../common/normalize-error.js";
import { normalizeResponse } from "../common/normalize-response.js";
import { QueueService } from "../queue/queue.service.js";

dotenv.config();

const getControllers = () => {
  const region = process.env.REGION;
  const s3Client = new S3Client({ region });
  const sqsClient = new SQSClient({ region });
  const importController = new ImportController(
    new ImportService(s3Client),
    new QueueService(sqsClient),
  );
  return { importController };
};

export const importProductsFile = async (event) => {
  try {
    const { importController } = getControllers();
    const { name } = event?.pathParameters;
    const signedUrl = await importController.create({ name });
    return normalizeResponse({ body: signedUrl });
  } catch (error) {
    return normalizeError(error);
  }
};

export const importFileParser = async (event) => {
  try {
    const { importController } = getControllers();
    await importController.parse({ records: event.Records });
  } catch (error) {
    return normalizeError(error);
  }
}
