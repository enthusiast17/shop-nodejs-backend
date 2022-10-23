import dotenv from "dotenv";

dotenv.config();

export const importBucketParams = {
  Bucket: process.env.BUCKET,
};

export const queueParams = {
  QueueUrl: process.env.SQS_URL,
};
