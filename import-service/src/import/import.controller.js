import csv from "csv-parser";
import { importBucketParams } from "../constants/params.constants.js";

export class ImportController {
  constructor(importService) {
    this.importService = importService;
  }

  async create({ name }) {
    const key = `uploaded/${name}`
    return this.importService.create({ key });
  }

  async parse({ records }) {
    await Promise.all(records.map(async (record) => {
      const key = record?.s3?.object?.key;
      console.log(`Record key: ${key}`);
      const file = await this.importService.read({
        key,
      });
      const readStream = file.Body;
      await new Promise((resolve, reject) => {
        const chunks = [];
        readStream.pipe(csv());
        readStream.on("data", (chunk) => {
          chunks.push(chunk);
          console.log(`Chunk: ${chunk}`);
        });
        readStream.on("reject", (error) => {
          reject(`Reject: ${error}`);
        });
        readStream.on("end", () => {
          console.log(`Chunks: ${chunks}`);
          Promise.all([
            this.importService.copy({
              key: key.replace("uploaded", "parsed"),
              copySource: `${importBucketParams.Bucket}/${key}`,
            }),
            this.importService.delete({
              key,
            }),
          ]).then(resolve);
        });
      });
    }));
  }
}
