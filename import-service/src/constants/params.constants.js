import dotenv from "dotenv";

dotenv.config();

export const importBucketParams = {
  Bucket: process.env.BUCKET,
};
