# OnCheckIn server

A [y-websocket](https://github.com/yjs/y-websocket) server for the [OnCheckIn app](https://oncheck.in/).

## Setup

Create a [Cloudflare tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

Add a published application route, such as:

- Hostname: `ws2.oncheck.in`
- Service: `http://server:1234`

Create a `.env` file with the tunnel token, such as:

```
TUNNEL_TOKEN=grTeNqvd...
```

## Start

```sh
docker compose up --build
```

Visit the published application route, such as:

https://ws2.oncheck.in
