import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { importBucketParams } from "../constants/params.constants.js";

export class ImportService {
  constructor(s3Client) {
    this.s3Client = s3Client;
  }

  async create({ key }) {
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

  async read({ key }) {
    return this.s3Client.send(
      new GetObjectCommand({
        ...importBucketParams,
        Key: key,
      })
    )
  }

  async copy({ key, copySource }) {
    return this.s3Client.send(
      new CopyObjectCommand({
        ...importBucketParams,
        Key: key,
        CopySource: copySource,
      }),
    )
  }

  async delete({ key }) {
    return this.s3Client.send(
      new DeleteObjectCommand({
        ...importBucketParams,
        Key: key,
      })
    )
  }
}
