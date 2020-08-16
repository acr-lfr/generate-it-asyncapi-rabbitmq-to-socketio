# generate-it-asyncapi-rabbitmq-to-socketio
Consume RabbitMQ Q and publish to socket-io.

- `server.ts` boostraps the logger and loads the `app.ts`
- `app.ts` awakens the Rabbit service
- The Rabbit sends payloads consumed from the Rabbit Qs on an Event Bus
- The `app.ts` listens to the Bus and sends these payloads down the sockets connected, in IEventBusEventRabbitMq form.

That's it.

Why - This is a fully generated server - It acts as a socket director between a RMQ and socket nodes.

[RMQ] -> [this server] -(*n)-> [Socket Nodes] -(*n)-> [End users (eg browsers)]

If your app has too many connections for a single socket director, you will have to introduce a load-balancer between many directors and many nodes.

## How
Create a new repo, run `npm init` then add this single line to your package json file: 
```
"generate:server": "generate-it ../ms_rabbitmq_d/build/rabbitmq_asyncapi_1.0.1.yml -y -t https://github.com/acrontum/generate-it-asyncapi-rabbitmq-to-socketio.git",
```

After initial generation, open the .nodegenrc file and enter all operationIds from your async api file you wish to consume, eg:
```
{
  "nodegenDir": "src/rabbitMQ",
  "nodegenMockDir": "src/rabbitMQ/__mocks__",
  "nodegenType": "server",
  "helpers": {
    "subscribeOpIds": [
      "msAuthenticationConnectionRequestAcceptedPublish",
      "msAuthenticationConnectionRequestReceivedPublish",

      "msChannelInviteAcceptedPublish",
      "msChannelInviteSendPublish",
      "msChannelJoinAcceptedPublish",
      "msChannelJoinRequestPublish",

      "msItemCommentedPublish",
      "msItemCommentCommentedPublish",
      "msItemLikedPublish"
    ],
    "publishOpIds": []
  }
}
```

## Things you need to change to use this tpl

- The nodegenrc file - you should input your own asyncapi operation ids to bind to.
- `src/config.ts` the rabbitmq section should be customised.