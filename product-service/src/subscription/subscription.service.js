import { PublishCommand } from "@aws-sdk/client-sns";
import { snsParams } from "../constants/params.constants.js";

export class SubscriptionService {
  constructor(snsClient) {
    this.snsClient = snsClient;
  }

  async create({ subject, message }) {
    return this.snsClient.send(new PublishCommand({
      ...snsParams,
      Subject: subject,
      Message: JSON.stringify(message),
    }));
  }
}
