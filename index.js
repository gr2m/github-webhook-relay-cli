// @ts-check

import WebhookRelay from "github-webhook-relay";

/**
 * @param {import('.').Options} options
 */
export default function run(options) {
  const [owner, repo] = options.repo.split("/");

  const relay = new WebhookRelay({
    owner,
    repo,
    createHookToken: options.token,
    // @ts-expect-error - complaints that string[] is not precise enough
    events: options.events.trim().split(/\s*,\s*/),
    webhookSecret: options.secret,
  });

  relay.on("start", () => console.log("▶️ start"));
  relay.on("stop", () => console.log("⏹️ stop"));
  relay.on("error", (error) => console.error(error));
  relay.on("webhook", async (event) => {
    const payload = JSON.parse(event.body);
    const eventNameWithAction = payload.action
      ? `${event.name}.${payload.action}`
      : event.name;

    process.stdout.write(
      `⏩ Forwarding ${eventNameWithAction} event to ${options.url} ... `
    );

    // do not forward some of the headers
    delete event.headers["connection"];
    delete event.headers["accept"];
    delete event.headers["accept-encoding"];
    delete event.headers["content-length"];

    // @ts-ignore - complaints that `fetch` is not defined
    const response = await fetch(options.url, {
      method: "POST",
      headers: event.headers,
      body: event.body,
    });

    console.log(response.status);
  });

  relay.start();

  return relay;
}
