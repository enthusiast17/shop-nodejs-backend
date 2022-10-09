import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { importBucketParams } from "../constants/params.constants.js";

export class ImportService {
  constructor(s3Client) {
    this.s3Client = s3Client;
  }

  async createSignedUrl({ key }) {
    const signedUrl = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        ...importBucketParams,
        Key: key,
      }),
      { expiresIn: 5000 },
    );

    return signedUrl;
  }
}
