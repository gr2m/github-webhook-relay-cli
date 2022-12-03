# ⚠️ This is work in progress. ⚠️

See [#1](https://github.com/gr2m/github-webhook-relay-cli/pull/1)

# `github-webhook-relay-cli`

> **Warning**  
> Receiving webhooks via websockets is currently in [private beta](https://github.blog/changelog/2022-11-16-webhook-forwarding-in-the-github-cli-public-beta/)

A Node.js CLI App that is using the [`github-webhook-relay`](https://github.com/gr2m/github-webhook-relay#readme) module and is implementing the same features as the [`gh webhook` plugin](https://github.com/cli/gh-webhook) for the [GitHub CLI](https://cli.github.com/).

## Usage

Forward all `issues` and `pull_request` webhook events from the `monalisa/octocat` repository to `http://localhost:3000/api/github/webhooks`:

```sh
npx github-webhook-relay \
  --token $GITHUB_TOKEN \
  --repo monalisa/hello-world \
  --events issues,pull_request \
  --url http://localhost:3000/api/github/webhooks
```

<table>
  <thead align=left>
    <tr>
      <th>
        name
      </th>
      <th>
        type
      </th>
      <th width=100%>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>token</code>
      </th>
      <td>
        <code>string</code>
      </td>
      <td>

**Required**. Access token to create the repository webhook. The token needs to have the `admin:repo_hook` scope. ([create a personal access token](https://github.com/settings/tokens/new?scopes=admin:repo_hook&description=github-webhook-relay)).

</td>
    </tr>
    <tr>
      <th>
        <code>repo</code>
      </th>
      <td>
        <code>string</code>
      </td>
      <td>

**Required**. The full repository name in the format `owner/repo`.

</td>
    </tr>
    <tr>
      <th>
        <code>events</code>
      </th>
      <td>
        <code>string</code>
      </td>
      <td>

**Required**. a comma separated list of webhook events. See [GitHub docs](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads) for a list of all events.

</td>
    </tr>
    <tr>
      <th>
        <code>url</code>
      </th>
      <td>
        <code>string</code>
      </td>
      <td>

**Required**. The full URL to forward the webhook events to. The quests will be sent as `POST` requests.

</td>
    </tr>
    <tr>
      <th>
        <code>secret</code>
      </th>
      <td>
        <code>string</code>
      </td>
      <td>

The secret used to sign the webhook payloads. Defaults to no secret.

</td>
    </tr>
  </tbody>
</table>

## License

[ISC](LICENSE)
