// Note: This file is for deployment only

const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require('stripe');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
require('dotenv').config()
const accountSid = 'AC4868d4a7d2ae39e35a4ccc8e228b4b1b';
const authToken = '5be48034ae2c6680a9dcada3cf0581ed';
const client = new twilio(accountSid, authToken);

/* Embedded */

/*const axios = require('axios');
const mime = require('mime');
const morgan = require('morgan');
const { URL } = require('url');*/

/* ------- */

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());


const PORT = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

//Twilio
app.get('/send-text', (req, res) => {
    //Welcome Message
    res.send('Hello to the Twilio Server')

    //_GET Variables
    const { recipient, textmessage } = req.query;


    //Send Text
    client.messages.create({
        body: textmessage,
        to: "+1" + recipient,  // Text this number
        from: '+12537990810' // From a valid Twilio number
    }).then((message) => console.log(message.body));
})

/*app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('http://localhost:3001/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
});*/

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var key_url = '/etc/letsencrypt/live/servingfresh.me/privkey.pem';
var cert_url = '/etc/letsencrypt/live/servingfresh.me/cert.pem';

var options = {};

app.get('/stripe/payment-intent', async (req, res) => {
  console.log('in stripe intent');
  const stripe = Stripe(
    process.env.NODE_ENV === 'production' && req.type !== 'test'
      ? process.env.REACT_APP_STRIPE_PUBLIC_KEY_LIVE
      : process.env.REACT_APP_STRIPE_PUBLIC_KEY
  );
  const intent = stripe.paymentIntents.create({
    amount: req.amount,
    currency: 'usd',
  });
  res.json({ client_secret: intent.client_secret });
});



if (process.env.SUDO_USER != undefined) {
  options['key'] = fs.readFileSync(key_url);
  options['cert'] = fs.readFileSync(cert_url);
  http
    .createServer(function (req, res) {
      res.writeHead(301, {
        Location: 'https://' + req.headers['host'] + req.url,
      });
      res.end();
    })
    .listen(80);
  https.createServer(options, app).listen(443);
} else {
  options['key'] = fs.readFileSync('privkey.pem');
  options['cert'] = fs.readFileSync('cert.pem');
  app.listen(PORT);
  https.createServer(options, app).listen(process.env.PORT + 1 || 443);
}
