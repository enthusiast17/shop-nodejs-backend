import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { queueParams } from "../constants/params.constants.js";

export class QueueService {
  constructor(sqsClient) {
    this.sqsClient = sqsClient;
  }

  async create({ messageBody }) {
    return this.sqsClient.send(
      new SendMessageCommand({
        ...queueParams,
        MessageBody: JSON.stringify(messageBody),
      })
    );
  }
}
