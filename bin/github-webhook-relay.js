#!/usr/bin/env node

// @ts-check

import meow from "meow";

import run from "../index.js";

const cli = meow(
  `
	Usage
	  $ github-webhook-relay-cli

	Options
	  --token, -t     access token with admin:repo_hook scope
    --repo, -r      repository name in the format of owner/repo
    --events, -e    events to listen to, comma separated
    --url, -u       url to send the webhook to
    --secret, -s    (optional) webhook secret

	Examples
	  $ npx github-webhook-relay \\
        --token $GITHUB_TOKEN \\
        --repo monalisa/hello-world \\
        --events issues,pull_request \\
        --url http://localhost:3000/api/github/webhooks
`,
  {
    importMeta: import.meta,

    flags: {
      token: {
        type: "string",
        alias: "t",
        isRequired: true,
      },
      repo: {
        type: "string",
        alias: "r",
        isRequired: true,
      },
      events: {
        type: "string",
        alias: "e",
        isRequired: true,
      },
      url: {
        type: "string",
        alias: "u",
        isRequired: true,
      },
      secret: {
        type: "string",
        alias: "s",
      },
    },
  }
);

const relay = run(cli.flags);

process.on("SIGINT", () => {
  relay.stop();
});
