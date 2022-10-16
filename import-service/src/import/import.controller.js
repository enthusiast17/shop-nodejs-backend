import csv from "csv-parser";
import { importBucketParams } from "../constants/params.constants.js";

export class ImportController {
  constructor(importService, queueService) {
    this.importService = importService;
    this.queueService = queueService;
  }

  async create({ name }) {
    const key = `uploaded/${name}`
    return this.importService.create({ key });
  }

  async parse({ records }) {
    await Promise.all(records.map(async (record) => {
      const key = record?.s3?.object?.key;
      const file = await this.importService.read({
        key,
      });
      const readStream = file.Body.pipe(csv());
      await new Promise((resolve, reject) => {
        readStream.on("data", (chunk) => {
          this.queueService.create({
            messageBody: chunk,
          });
        });
        readStream.on("reject", (error) => {
          reject(`Reject: ${error}`);
        });
        readStream.on("end", () => {
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
