import dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
import { ImportController } from "./import.controller.js";
import { ImportService } from "./import.service.js";
import { normalizeError } from "../common/normalize-error.js";
import { normalizeResponse } from "../common/normalize-response.js";

dotenv.config();

const getImportController = () => {
  const s3Client = new S3Client({ region: process.env.REGION });
  const importController = new ImportController(new ImportService(s3Client));
  return { s3Client, importController };
};

export const importProductsFile = async (event) => {
  try {
    const { importController } = getImportController();
    const { name } = event?.pathParameters;
    const signedUrl = await importController.create({ name });
    return normalizeResponse({ body: signedUrl });
  } catch (error) {
    return normalizeError(error);
  }
};

export const importFileParser = async (event) => {
  try {
    const { importController } = getImportController();
    await importController.parse({ records: event.Records });
  } catch (error) {
    return normalizeError(error);
  }
}
