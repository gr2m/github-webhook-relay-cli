import WebhookRelay from "github-webhook-relay";
import { expectType } from "tsd";
import run from "./index";

const relay = run({
  token: "",
  repo: "",
  events: "",
  url: "",
});

expectType<WebhookRelay>(relay);
