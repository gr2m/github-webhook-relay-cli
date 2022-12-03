import WebhookRelay from "github-webhook-relay";

export interface Options {
  token: string;
  repo: string;
  events: string;
  url: string;
  secret?: string;
}

export default function (options: Options): WebhookRelay;
