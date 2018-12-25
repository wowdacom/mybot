const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: '5jQODjW4ZMGytYyn0+1Wt4/O1TySKwycKkxbJazRsojquaeba8b0FlDymqEnpngtMsLU3VVlQ9sU4KDUvXYWBhuovNdVzAPIeCwVwnDiPWESHgJjSOp/TyZjsPQ/NDaJfON++TwntWIxdMpmRBxOGAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'be9a76da1d9fbbee14e4492f2f5e0ad1'
};

const app = express();

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on https://127.0.0.1/${port}`);
});
